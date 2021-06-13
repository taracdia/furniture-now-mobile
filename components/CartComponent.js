import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet, Alert, Image } from "react-native";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changeFurnitureNumber } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import CartWidget from "./CartWidget";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
	};
};

const mapDispatchToProps = {
	changeFurnitureNumber: (furnitureId, number) =>
		changeFurnitureNumber(furnitureId, number),
};

class Cart extends Component {
	// static navigationOptions = {
	// 	title: "Cart",
	// };

	render() {
		const { navigate } = this.props.navigation;
		const renderCartItem = ({ item }) => {
			return (
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() =>
							navigate("FurnitureInfo", {
								furnitureId: item.id,
							})
						}
						style={styles.row}
					>
						<Image
							source={{ uri: baseUrl + item.image }}
							style={{ width: 50, height: 50, margin: 10 }}
						/>
						<Text>{item.name}</Text>
						<CartWidget furniture={item} />
					</TouchableOpacity>
					<Icon
						name="trash"
						type="font-awesome"
						color="red"
						raised
						reverse
						onPress={() =>
							Alert.alert(
								"Delete from Cart?",
								"Are you sure you wish to delete the " +
									item.name +
									" from your cart?",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "OK",
										onPress: () =>
											this.props.changeFurnitureNumber(
												item.id,
												0
											),
									},
								],
								{ cancelable: false }
							)
						}
					/>
				</View>
			);
		};

		if (this.props.furnitures.isLoading) {
			return <Loading />;
		}
		if (this.props.furnitures.errMess) {
			return (
				<View>
					<Text>{this.props.furnitures.errMess}</Text>
				</View>
			);
		}
		return (
			<Animatable.View animation="fadeInRightBig" duration={2000}>
				<FlatList
					data={this.props.furnitures.furnitures.filter(
						furniture => furniture.quantity > 0
					)}
					renderItem={renderCartItem}
					keyExtractor={item => item.id.toString()}
				/>
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		alignItems: "center",
		flexDirection: "row",
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

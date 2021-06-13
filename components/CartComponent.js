import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changeFurnitureNumber } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

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
	static navigationOptions = {
		title: "Cart",
	};

	render() {
		const { navigate } = this.props.navigation;
		const renderCartItem = ({ item }) => {
			return (
				<SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
					<View style={styles.deleteView}>
						<TouchableOpacity
							style={styles.deleteTouchable}
							onPress={() =>
								Alert.alert(
									"Delete from Cart?",
									"Are you sure you wish to delete the furniture " +
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
						>
							<Text style={styles.deleteText}>Delete</Text>
						</TouchableOpacity>
					</View>

					<View>
						<ListItem
							title={item.name}
							subtitle={item.description}
							leftAvatar={{
								source: { uri: baseUrl + item.image },
							}}
							onPress={() =>
								navigate("FurnitureInfo", {
									furnitureId: item.id,
								})
							}
						/>
					</View>
				</SwipeRow>
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
	deleteView: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		flex: 1,
	},
	deleteTouchable: {
		backgroundColor: "red",
		height: "100%",
		justifyContent: "center",
	},
	deleteText: {
		color: "white",
		fontWeight: "700",
		textAlign: "center",
		fontSize: 16,
		width: 100,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

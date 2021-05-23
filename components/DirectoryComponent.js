import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
	};
};

class Directory extends Component {
	static navigationOptions = {
		title: "Directory",
	};

	render() {
		const { navigate } = this.props.navigation;
		const renderDirectoryItem = ({ item }) => {
			return (
				<Tile
					title={item.name}
					caption={item.description}
					featured
					onPress={() =>
						navigate("FurnitureInfo", { furnitureId: item.id })
					}
					imageSrc={{ uri: baseUrl + item.image }}
				/>
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
			<FlatList
				data={this.props.furnitures.furnitures}
				renderItem={renderDirectoryItem}
				keyExtractor={item => item.id.toString()}
			/>
		);
	}
}

export default connect(mapStateToProps)(Directory);

import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

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

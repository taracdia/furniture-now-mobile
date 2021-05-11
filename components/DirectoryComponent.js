import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";

class Directory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			furnitures: FURNITURES,
		};
	}

	static navigationOptions = {
		title: "Directory",
	};

	render() {
		const { navigate } = this.props.navigation;
		const renderDirectoryItem = ({ item }) => {
			return (
				<ListItem
					title={item.name}
					subtitle={item.description}
					onPress={() =>
						navigate("FurnitureInfo", { furnitureId: item.id })
					}
					leftAvatar={{ source: require("./images/boat-table.jpg") }}
				/>
			);
		};

		return (
			<FlatList
				data={this.state.furnitures}
				renderItem={renderDirectoryItem}
				keyExtractor={item => item.id.toString()}
			/>
		);
	}
}

export default Directory;

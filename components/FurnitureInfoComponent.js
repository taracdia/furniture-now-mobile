import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";

function RenderFurniture({ furniture }) {
	if (furniture) {
		return (
			<Card
				featuredTitle={furniture.name}
				image={require("../shared/images/boat-table.jpg")}
			>
				<Text style={{ margin: 10 }}>{furniture.description}</Text>
			</Card>
		);
	}
	return <View />;
}

class FurnitureInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			furnitures: FURNITURES,
		};
	}

	static navigationOptions = {
		title: "Furniture Information",
	};

	render() {
		const furnitureId = this.props.navigation.getParam("furnitureId");
		const furniture = this.state.furnitures.filter(
			furniture => furniture.id === furnitureId
		)[0];
		return <RenderFurniture furniture={furniture} />;
	}
}

export default FurnitureInfo;

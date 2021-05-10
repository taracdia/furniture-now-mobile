import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

function RenderFurniture({ furniture }) {
	if (furniture) {
		return (
			<Card
				featuredTitle={furniture.name}
				image={require("./images/boat-table.jpg")}
			>
				<Text style={{ margin: 10 }}>{furniture.description}</Text>
			</Card>
		);
	}
	return <View />;
}

function FurnitureInfo(props) {
	return <RenderFurniture furniture={props.furniture} />;
}

export default FurnitureInfo;

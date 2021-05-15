import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";

function RenderItem({ item }) {
	if (item) {
		return (
			<Card
				featuredTitle={item.name}
				image={require("../shared/images/boat-table.jpg")}
			>
				<Text style={{ margin: 10 }}>{item.description}</Text>
			</Card>
		);
	}
	return <View />;
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			furnitures: FURNITURES,
		};
	}

	static navigationOptions = {
		title: "Home",
	};

	render() {
		return (
			<ScrollView>
				<RenderItem
					item={
						this.state.furnitures.filter(
							furniture => furniture.featured
						)[0]
					}
				/>
			</ScrollView>
		);
	}
}

export default Home;

import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
	};
};

function RenderItem({ item }) {
	if (item) {
		return (
			<Card
				featuredTitle={item.name}
				image={{ uri: baseUrl + item.image }}
			>
				<Text style={{ margin: 10 }}>{item.description}</Text>
			</Card>
		);
	}
	return <View />;
}

class Home extends Component {
	static navigationOptions = {
		title: "Home",
	};

	render() {
		return (
			<ScrollView>
				<RenderItem
					item={
						this.props.furnitures.furnitures.filter(
							furniture => furniture.featured
						)[0]
					}
				/>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps)(Home);

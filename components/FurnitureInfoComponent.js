import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { FURNITURES } from "../shared/furnitures";
import { COMMENTS } from "../shared/comments";

function RenderComments({ comments }) {
	const renderCommentItem = ({ item }) => {
		return (
			<View style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.text}</Text>
				<Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
				<Text
					style={{ fontSize: 12 }}
				>{`-- ${item.author}, ${item.date}`}</Text>
			</View>
		);
	};

	return (
		<Card title="Comments">
			<FlatList
				data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item => item.id.toString()}
			/>
		</Card>
	);
}

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
			comments: COMMENTS,
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
		const comments = this.state.comments.filter(
			comment => comment.furnitureId === furnitureId
		);

		return (
			<ScrollView>
				<RenderFurniture furniture={furniture} />
				<RenderComments comments={comments} />
			</ScrollView>
		);
	}
}

export default FurnitureInfo;

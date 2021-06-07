import React from "react";
import { Text, View, FlatList } from "react-native";
import { Card, Rating } from "react-native-elements";
import * as Animatable from "react-native-animatable";

function Comments({ comments }) {
	const renderCommentItem = ({ item }) => {
		return (
			<View style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.text}</Text>
				<Rating
					startingValue={item.rating}
					imageSize={10}
					style={{ alignItems: "flex-start", paddingVertical: "5%" }}
					readonly
				/>
				<Text
					style={{ fontSize: 12 }}
				>{`-- ${item.author}, ${item.date}`}</Text>
			</View>
		);
	};

	return (
		<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
			<Card title="Comments">
				<FlatList
					data={comments}
					renderItem={renderCommentItem}
					keyExtractor={item => item.id.toString()}
				/>
			</Card>
		</Animatable.View>
	);
}

export default Comments;

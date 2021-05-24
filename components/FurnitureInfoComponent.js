import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
		comments: state.comments,
		favorites: state.favorites,
	};
};

const mapDispatchToProps = {
	postFavorite: furnitureId => postFavorite(furnitureId),
};

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

	console.log("comments: ", comments);

	return (
		<Card title="Comments">
			{/* todo: */}
			{/* <ScrollView>
                
            </ScrollView> */}
			<FlatList
				data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item => item.id.toString()}
			/>
		</Card>
	);
}

function RenderFurniture(props) {
	const { furniture } = props;
	if (furniture) {
		return (
			<Card
				featuredTitle={furniture.name}
				image={{ uri: baseUrl + furniture.image }}
			>
				<Text style={{ margin: 10 }}>{furniture.description}</Text>
				<Icon
					name={props.favorite ? "heart" : "heart-o"}
					type="font-awesome"
					color="#f50"
					raised
					reverse
					onPress={() =>
						props.favorite
							? console.log("Already set as a favorite")
							: props.markFavorite()
					}
				/>
			</Card>
		);
	}
	return <View />;
}

class FurnitureInfo extends Component {
	static navigationOptions = {
		title: "Furniture Information",
	};

	markFavorite(furnitureId) {
		this.props.postFavorite(furnitureId);
	}

	render() {
		const furnitureId = this.props.navigation.getParam("furnitureId");
		const furniture = this.props.furnitures.furnitures.filter(
			furniture => furniture.id === furnitureId
		)[0];
		const comments = this.props.comments.comments.filter(
			comment => comment.furnitureId === furnitureId
		);

		return (
			<ScrollView>
				<RenderFurniture
					furniture={furniture}
					favorite={this.props.favorites.includes(furnitureId)}
					markFavorite={() => this.markFavorite(furnitureId)}
				/>
				<RenderComments comments={comments} />
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureInfo);

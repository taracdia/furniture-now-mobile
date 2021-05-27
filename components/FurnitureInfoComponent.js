import React, { Component } from "react";
import {
	Text,
	View,
	ScrollView,
	FlatList,
	Modal,
	Button,
	StyleSheet,
	Alert,
	PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
		comments: state.comments,
		favorites: state.favorites,
	};
};

const mapDispatchToProps = {
	postFavorite: furnitureId => postFavorite(furnitureId),
	postComment: (furnitureId, rating, author, text) =>
		postComment(furnitureId, rating, author, text),
};

function RenderComments({ comments }) {
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

function RenderFurniture(props) {
	const { furniture } = props;

	const view = React.createRef();

	const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: () => {
			view.current
				.rubberBand(1000)
				.then(endState =>
					console.log(endState.finished ? "finished" : "canceled")
				);
		},
		onPanResponderEnd: (e, gestureState) => {
			console.log("pan responder end", gestureState);
			if (recognizeDrag(gestureState)) {
				Alert.alert(
					"Add Favorite",
					"Are you sure you wish to add " +
						furniture.name +
						" to favorites?",
					[
						{
							text: "Cancel",
							style: "cancel",
							onPress: () => console.log("Cancel Pressed"),
						},
						{
							text: "OK",
							onPress: () =>
								props.favorite
									? console.log("Already set as a favorite")
									: props.markFavorite(),
						},
					],
					{ cancelable: false }
				);
			}
			return true;
		},
	});

	if (furniture) {
		return (
			<Animatable.View
				animation="fadeInDown"
				duration={2000}
				delay={1000}
				ref={view}
				{...panResponder.panHandlers}
			>
				<Card
					featuredTitle={furniture.name}
					image={{ uri: baseUrl + furniture.image }}
				>
					<Text style={{ margin: 10 }}>{furniture.description}</Text>
					<View style={styles.cardRow}>
						<Icon
							name={props.favorite ? "heart" : "heart-o"}
							type="font-awesome"
							color="#f50"
							raised
							reverse
							onPress={() =>
								props.favorite
									? console.log("Already")
									: props.markFavorite()
							}
						/>
						<Icon
							name={"pencil"}
							type="font-awesome"
							color="#5637DD"
							raised
							reverse
							style={styles.cardItem}
							onPress={() => props.onShowModal()}
						/>
					</View>
				</Card>
			</Animatable.View>
		);
	}
	return <View />;
}

class FurnitureInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			rating: 5,
			author: "",
			text: "",
		};
	}
	markFavorite(furnitureId) {
		this.props.postFavorite(furnitureId);
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	//TODO: new comments aren't showing up

	handleComment(furnitureId) {
		this.props.postComment(
			furnitureId,
			this.state.rating,
			this.state.author,
			this.state.text
		);
		this.toggleModal();
	}

	resetForm() {
		this.setState({
			showModal: false,
			rating: 5,
			author: "",
			text: "",
		});
	}

	static navigationOptions = {
		title: "Furniture Information",
	};

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
					onShowModal={() => this.toggleModal()}
				/>
				<RenderComments comments={comments} />
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.showModal}
					onRequestClose={() => this.toggleModal()}
				>
					<View style={styles.modal}>
						<Rating
							showRating
							startingValue={this.state.rating}
							imageSize={40}
							onFinishRating={rating =>
								this.setState({ rating: rating })
							}
							style={{ paddingVertical: 10 }}
						/>
						<Input
							placeholder="Author"
							leftIcon={{ type: "font-awesome", name: "user-o" }}
							leftIconContainerStyle={{ paddingRight: 10 }}
							onChangeText={text =>
								this.setState({ author: text })
							}
							value={this.state.author}
						/>
						<Input
							placeholder="Comment"
							leftIcon={{
								type: "font-awesome",
								name: "comment-o",
							}}
							leftIconContainerStyle={{ paddingRight: 10 }}
							onChangeText={text => this.setState({ text: text })}
							value={this.state.text}
						/>
						<View>
							<Button
								title="Submit"
								color="#5637DD"
								onPress={() => {
									this.handleComment(furnitureId);
									this.resetForm();
								}}
							/>
						</View>
						<View style={{ margin: 10 }}>
							<Button
								onPress={() => {
									this.toggleModal();
									this.resetForm();
								}}
								color="#808080"
								title="Cancel"
							/>
						</View>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	cardRow: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
		margin: 20,
	},
	cardItem: {
		flex: 1,
		margin: 20,
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureInfo);

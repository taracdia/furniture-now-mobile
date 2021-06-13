import React, { Component } from "react";
import {
	Text,
	View,
	ScrollView,
	Modal,
	Button,
	StyleSheet,
	Alert,
	PanResponder,
	SafeAreaView,
	Share,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, changeFurnitureNumber } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import { primaryColor, secondaryColor, gray } from "../Colors";
import { TextInput } from "react-native-gesture-handler";
import Comments from "./CommentsComponent";
import CartWidget from "./CartWidget";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
		comments: state.comments,
	};
};

const mapDispatchToProps = {
	postComment: (furnitureId, rating, author, text) =>
		postComment(furnitureId, rating, author, text),
	changeFurnitureNumber: (furnitureId, number) =>
		changeFurnitureNumber(furnitureId, number),
};

function RenderFurniture(props) {
	const { furniture, furnitureNumber } = props;

	const view = React.createRef();

	const recognizeComment = ({ dx }) => (dx > 200 ? true : false);

	const recognizeCart = ({ dx }) => (dx < -200 ? true : false);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: () => {
			view.current.rubberBand(1000);
		},
		onPanResponderEnd: (e, gestureState) => {
			if (recognizeCart(gestureState)) {
				Alert.alert(
					"Add to Cart",
					"Are you sure you wish to add " +
						furniture.name +
						" to your cart?",
					[
						{
							text: "Cancel",
							style: "cancel",
						},
						{
							text: "OK",
							onPress: () =>
								props.changeNumber(furniture.quantity + 1),
						},
					],
					{ cancelable: false }
				);
			} else if (recognizeComment(gestureState)) {
				props.onShowModal();
			}
			return true;
		},
	});

	const shareFurniture = (title, message, url) => {
		Share.share(
			{
				title: title,
				message: `${title}: ${message} ${url}`,
				url: url,
			},
			{
				dialogTitle: "Share " + title,
			}
		);
	};

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
						{furniture.quantity ? (
							<CartWidget
								// number={furniture.quantity}
								// changeNumber={num => {
								// 	props.changeNumber(num);
								// }}
								furniture={furniture}
							/>
						) : (
							<Icon
								name={"shopping-cart"}
								type="font-awesome"
								color={secondaryColor}
								raised
								reverse
								onPress={() => {
									props.changeNumber(1);
								}}
							/>
						)}
						<Icon
							name={"pencil"}
							type="font-awesome"
							color={primaryColor}
							raised
							reverse
							style={styles.cardItem}
							onPress={() => props.onShowModal()}
						/>
						<Icon
							name={"share"}
							type="font-awesome"
							color={primaryColor}
							raised
							reverse
							onPress={() =>
								shareFurniture(
									furniture.name,
									furniture.description,
									baseUrl + furniture.image
								)
							}
						/>
					</View>
				</Card>
			</Animatable.View>
		);
	}
	return <View />;
}

function FurnitureInfo(props) {
	const furnitureId = props.navigation.getParam("furnitureId");
	const furniture = props.furnitures.furnitures.filter(
		furniture => furniture.id === furnitureId
	)[0];

	const comments = props.comments.comments.filter(
		comment => comment.furnitureId === furnitureId
	);

	const [furnitureNumber, setShownNumber] = React.useState(
		furniture.quantity
	);

	const [showModal, setShowModal] = React.useState(false);

	const [rating, setRating] = React.useState(5);

	const [author, setAuthor] = React.useState("");
	const [text, setText] = React.useState("");

	function changeNumber(furnitureId, number) {
		props.changeFurnitureNumber(furnitureId, number);
		setShownNumber(number);
	}

	function toggleModal() {
		setShowModal(!showModal);
	}

	function handleComment(furnitureId) {
		props.postComment(furnitureId, rating, author, text);
		toggleModal();
	}

	function resetForm() {
		setText("");
		setAuthor("");
		setShowModal(false);
		setRating(5);
	}

	return (
		<ScrollView>
			<RenderFurniture
				furniture={furniture}
				changeNumber={number => changeNumber(furnitureId, number)}
				onShowModal={() => toggleModal()}
				furnitureNumber={furnitureNumber}
			/>
			<Comments comments={comments} />
			<Modal
				animationType={"slide"}
				transparent={false}
				visible={showModal}
				onRequestClose={() => toggleModal()}
			>
				<View style={styles.modal}>
					<Rating
						showRating
						startingValue={rating}
						imageSize={40}
						onFinishRating={rating => setRating(rating)}
						style={{ paddingVertical: 10 }}
					/>
					<Input
						placeholder="Author"
						leftIcon={{ type: "font-awesome", name: "user-o" }}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={text => setAuthor(text)}
						value={author}
					/>
					<Input
						placeholder="Comment"
						leftIcon={{
							type: "font-awesome",
							name: "comment-o",
						}}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={text => setText(text)}
						value={text}
					/>
					<View>
						<Button
							title="Submit"
							color={primaryColor}
							onPress={() => {
								handleComment(furnitureId);
								resetForm();
							}}
						/>
					</View>
					<View style={{ margin: 10 }}>
						<Button
							onPress={() => {
								toggleModal();
								resetForm();
							}}
							color={gray}
							title="Cancel"
						/>
					</View>
				</View>
			</Modal>
		</ScrollView>
	);
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

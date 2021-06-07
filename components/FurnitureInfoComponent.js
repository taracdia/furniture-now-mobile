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
	const { furniture } = props;

	const [isWidgetShown, showWidget] = React.useState(false);

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

	const widget = (
		<>
			<Icon
				name="minus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => {
					if (furniture.quantity > 0) {
						props.changeNumber(furniture.quantity - 1);
					}
				}}
			/>

			<SafeAreaView>
				<TextInput
					defaultValue={furniture.quantity.toString()}
					keyboardType="numeric"
					onSubmitEditing={event =>
						props.changeNumber(+event.nativeEvent.text)
					}
				/>
			</SafeAreaView>
			<Icon
				name="plus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => props.changeNumber(furniture.quantity + 1)}
			/>
		</>
	);

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
						{isWidgetShown ? (
							widget
						) : (
							<Icon
								name={"shopping-cart"}
								type="font-awesome"
								color={secondaryColor}
								raised
								reverse
								onPress={() => {
									props.changeNumber(1);
									showWidget(true);
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
	changeNumber(furnitureId, number) {
		this.props.changeFurnitureNumber(furnitureId, number);
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

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
					changeNumber={number =>
						this.changeNumber(furnitureId, number)
					}
					onShowModal={() => this.toggleModal()}
				/>
				<Comments comments={comments} />
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
								color={primaryColor}
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
								color={gray}
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

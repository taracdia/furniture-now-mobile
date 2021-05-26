import React, { Component } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
	return {
		furnitures: state.furnitures,
	};
};

function RenderItem(props) {
	const { item } = props;

	if (props.isLoading) {
		return <Loading />;
	}
	if (props.errMess) {
		return (
			<View>
				<Text>{props.errMess}</Text>
			</View>
		);
	}
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
	constructor(props) {
		super(props);
		this.state = {
			scaleValue: new Animated.Value(0),
		};
	}

	animate() {
		Animated.timing(this.state.scaleValue, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
		}).start();
	}

	componentDidMount() {
		this.animate();
	}

	static navigationOptions = {
		title: "Home",
	};

	render() {
		return (
			<Animated.ScrollView
				style={{ transform: [{ scale: this.state.scaleValue }] }}
			>
				<RenderItem
					item={
						this.props.furnitures.furnitures.filter(
							furniture => furniture.featured
						)[0]
					}
					isLoading={this.props.furnitures.isLoading}
					errMess={this.props.furnitures.errMess}
				/>
			</Animated.ScrollView>
		);
	}
}

export default connect(mapStateToProps)(Home);

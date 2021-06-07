import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";

import * as Animatable from "react-native-animatable";

class About extends Component {
	static navigationOptions = {
		title: "About",
	};

	render() {
		return (
			<ScrollView>
				<Animatable.View
					animation="fadeInDown"
					duration={2000}
					delay={1000}
				>
					<Card title="About">
						<Text
							style={{
								fontWeight: "bold",
								alignSelf: "center",
							}}
						>
							Made with React Native
						</Text>
						<Text>
							This app was made in React Native by Tara Dia, with
							special thanks to the folks at NuCamp. Come talk to
							me on linkedIn: https://www.linkedin.com/in/taracdia
						</Text>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}

export default About;

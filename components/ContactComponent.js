import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Card, Button, Icon, Text } from "react-native-elements";
import { primaryColor, white, primaryLight } from "../Colors";

import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

class Contact extends Component {
	sendMail() {
		MailComposer.composeAsync({
			recipients: ["example@gmail.com"],
			subject: "Inquiry",
			body: "To whom it may concern:",
		});
	}
	static navigationOptions = {
		title: "Contact Us",
	};
	render() {
		return (
			<ScrollView>
				<Animatable.View
					animation="fadeInDown"
					duration={2000}
					delay={1000}
				>
					<Card title="Contact Us">
						<Text
							style={{ fontWeight: "bold", alignSelf: "center" }}
						>
							Questions, concerns, feedback?
						</Text>
						<Text>1 Furniture Way</Text>
						<Text>Austin, TX 78753</Text>
						<Text style={{ marginBottom: 10 }}>U.S.A.</Text>
						<Text>Phone: 1-206-555-1234</Text>
						<Button
							title="Send Email"
							buttonStyle={{
								backgroundColor: primaryColor,
								margin: 40,
							}}
							icon={
								<Icon
									name="envelope-o"
									type="font-awesome"
									color={white}
									iconStyle={{ marginRight: 10 }}
								/>
							}
							onPress={() => this.sendMail()}
						/>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}

export default Contact;

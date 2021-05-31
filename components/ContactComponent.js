import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { bgColor, white, drawerBg } from "../Colors";

class Contact extends Component {
	sendMail() {
		MailComposer.composeAsync({
			recipients: ["campsites@nucamp.co"],
			subject: "Inquiry",
			body: "To whom it may concern:",
		});
	}
	render() {
		return (
			<View>
				<Button
					title="Send Email"
					buttonStyle={{ backgroundColor: bgColor, margin: 40 }}
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
			</View>
		);
	}
}

export default Contact;

import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

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
					buttonStyle={{ backgroundColor: "#5637DD", margin: 40 }}
					icon={
						<Icon
							name="envelope-o"
							type="font-awesome"
							color="#fff"
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

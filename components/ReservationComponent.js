import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
	Text,
	View,
	StyleSheet,
	Picker,
	Switch,
	Button,
	Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import { primaryColor, white, primaryLight } from "../Colors";

class Reservation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			guests: 1,
			hikeIn: false,
			date: "",
		};
	}

	static navigationOptions = {
		title: "Reserve Campsite",
	};

	handleReservation() {
		console.log(JSON.stringify(this.state));
		Alert.alert(
			"Begin Search?",
			"Number of Campers: " +
				this.state.guests +
				"\n\nHike-In? " +
				this.state.hikeIn +
				"\n\nDate: " +
				this.state.date,
			[
				{
					text: "Cancel",
					onPress: () => this.resetForm(),
					style: " cancel",
				},
				{
					text: "OK",
					onPress: () => {
						this.presentLocalNotification(this.state.date);
						this.resetForm();
					},
				},
			],
			{ cancelable: false }
		);
	}

	resetForm() {
		this.setState({
			guests: 1,
			hikeIn: false,
			date: "",
		});
	}

	async presentLocalNotification(date) {
		function sendNotification() {
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
				}),
			});

			Notifications.scheduleNotificationAsync({
				content: {
					title: "Your Campsite Reservation Search",
					body: `Search for ${date} requested`,
					// body: `Search for  requested`,
				},
				trigger: null,
			});
		}

		let permissions = await Notifications.getPermissionsAsync();
		if (!permissions.granted) {
			permissions = await Notifications.requestPermissionsAsync();
		}
		if (permissions.granted) {
			sendNotification();
		}
	}

	render() {
		return (
			<Animatable.View animation="zoomIn" duration={2000} delay={1000}>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Number of Campers</Text>
					<Picker
						style={styles.formItem}
						selectedValue={this.state.guests}
						onValueChange={itemValue =>
							this.setState({ guests: itemValue })
						}
					>
						<Picker.Item label="1" value="1" />
						<Picker.Item label="2" value="2" />
						<Picker.Item label="3" value="3" />
						<Picker.Item label="4" value="4" />
						<Picker.Item label="5" value="5" />
						<Picker.Item label="6" value="6" />
					</Picker>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Hike-In?</Text>
					<Switch
						style={styles.formItem}
						value={this.state.hikeIn}
						trackColor={{ true: primaryColor, false: null }}
						onValueChange={value =>
							this.setState({ hikeIn: value })
						}
					></Switch>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Date</Text>
					<DatePicker
						style={{ flex: 2, marginRight: 20 }}
						date={this.state.date}
						format="YYYY-MM-DD"
						mode="date"
						placeholder="Select Date"
						minDate={new Date().toISOString()}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: "absolute",
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
							},
						}}
						onDateChange={date => {
							this.setState({ date: date });
						}}
					/>
				</View>
				<View style={styles.formRow}>
					<Button
						onPress={() => this.handleReservation()}
						title="Search"
						color={primaryColor}
						accessibilityLabel="Tap me to search for available days to reserve"
					/>
				</View>
			</Animatable.View>
		);
	}
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
	},
	formItem: {
		flex: 1,
	},
});

export default Reservation;

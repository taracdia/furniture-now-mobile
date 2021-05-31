import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { primaryColor, white, primaryLight } from "../Colors";

function Loading() {
	return (
		<View style={styles.loadingView}>
			<ActivityIndicator size="large" color={primaryColor} />
			<Text style={styles.loadingText}>Loading . . .</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	loadingView: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	loadingText: {
		color: primaryColor,
		fontSize: 14,
		fontWeight: "bold",
	},
});

export default Loading;

import React from "react";
import { FURNITURES } from "../shared/furnitures";
import { View, Platform } from "react-native";
import FurnitureInfo from "./FurnitureInfoComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Directory from "DirectoryComponent";

const DirectoryNavigator = createStackNavigator(
	{
		Directory: { screen: Directory },
		FurnitureInfo: { screen: FurnitureInfo },
	},
	{
		initialRouteName: "Directory",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "#5637DD",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				color: "#fff",
			},
		},
	}
);

const AppNavigator = createAppContainer(DirectoryNavigator);

class Main extends Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop:
						Platform.OS === "ios"
							? 0
							: Expo.Constants.statusBarHeight,
				}}
			>
				<AppNavigator />
			</View>
		);
	}
}

export default Main;

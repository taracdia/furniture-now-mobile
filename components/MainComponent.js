import React, { Component } from "react";
import {
	View,
	Platform,
	StyleSheet,
	Text,
	ScrollView,
	Image,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import FurnitureInfo from "./FurnitureInfoComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Directory from "./DirectoryComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { fetchFurnitures, fetchComments } from "../redux/ActionCreators";
import Reservation from "./ReservationComponent";
import Cart from "./CartComponent";
import Login from "./LoginComponent";
import { baseUrl } from "../shared/baseUrl";
import { primaryColor, white, primaryLight, secondaryColor } from "../Colors";

const mapDispatchToProps = {
	fetchFurnitures,
	fetchComments,
};

const CustomDrawerContentComponent = props => (
	<ScrollView>
		<SafeAreaView
			style={styles.container}
			forceInset={{ top: "always", horizontal: "never" }}
		>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: baseUrl + "img/logo.png" }}
						style={styles.drawerImage}
					/>
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>FurnitureNow!</Text>
				</View>
			</View>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
);

const DirectoryNavigator = createStackNavigator(
	{
		Directory: {
			screen: Directory,
			navigationOptions: ({ navigation }) => ({
				headerLeft: (
					<Icon
						name="list"
						type="font-awesome"
						iconStyle={styles.stackIcon}
						onPress={() => navigation.toggleDrawer()}
					/>
				),
			}),
		},
		FurnitureInfo: { screen: FurnitureInfo },
	},
	{
		initialRouteName: "Directory",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: primaryColor,
			},
			headerTintColor: white,
			headerTitleStyle: {
				color: white,
			},
		},
	}
);

const createNavigator = (screenName, screenItem, iconName) => {
	return createStackNavigator(
		{
			[screenName]: { screen: screenItem },
		},
		{
			defaultNavigationOptions: ({ navigation }) => ({
				headerStyle: {
					backgroundColor: primaryColor,
				},
				headerTintColor: white,
				headerTitleStyle: {
					color: white,
				},
				headerLeft: (
					<Icon
						name={iconName}
						type="font-awesome"
						iconStyle={styles.stackIcon}
						onPress={() => navigation.toggleDrawer()}
					/>
				),
			}),
		}
	);
};

const MainNavigator = createDrawerNavigator(
	{
		Login: {
			screen: createNavigator("Login", Login, "sign-in"),
			navigationOptions: {
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="sign-in"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		Home: {
			screen: createNavigator("Home", Home, "home"),
			navigationOptions: {
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="home"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		Directory: {
			screen: DirectoryNavigator,
			navigationOptions: {
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="list"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		Reservation: {
			screen: createNavigator("Reservation", Reservation, "calendar"),
			navigationOptions: {
				drawerLabel: "Reserve Walkthrough",
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="calendar"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},

		Cart: {
			screen: createNavigator("Cart", Cart, "shopping-cart"),
			navigationOptions: {
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="shopping-cart"
						type="font-awesome"
						size={24}
						// color={tintColor}
					/>
				),
			},
		},

		Contact: {
			screen: createNavigator("Contact", Contact, "address-card"),
			navigationOptions: {
				drawerLabel: "Contact Us",
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="address-card"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		About: {
			screen: createNavigator("About", About, "info-circle"),
			navigationOptions: {
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="info-circle"
						type="font-awesome"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
	},
	{
		initialRouteName: "Home",
		drawerBackgroundColor: primaryLight,
		contentComponent: CustomDrawerContentComponent,
		contentOptions: {
			activeTintColor: secondaryColor,
		},
	}
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
	componentDidMount() {
		this.props.fetchFurnitures();
		this.props.fetchComments();
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop:
						Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
				}}
			>
				<AppNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerHeader: {
		backgroundColor: primaryColor,
		height: 140,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
	},
	drawerHeaderText: {
		color: white,
		fontSize: 24,
		fontWeight: "bold",
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width: 60,
	},
	stackIcon: {
		marginLeft: 10,
		color: white,
		fontSize: 24,
	},
});

export default connect(null, mapDispatchToProps)(Main);

import React from "react";
import { FURNITURES } from "../shared/furnitures";
import { View, Platform } from "react-native";
import FurnitureInfo from "./FurnitureInfoComponent";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Directory from "DirectoryComponent";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			furnitures: FURNITURES,
			selectedFurniture: null,
		};
	}
	onFurnitureSelect(furnitureId) {
		this.setState({ selectedFurniture: furnitureId });
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Directory
					furnitures={this.state.furnitures}
					onPress={furnitureId => this.onFurnitureSelect(furnitureId)}
				/>
				<FurnitureInfo
					furniture={
						this.state.furnitures.filter(
							furniture =>
								furniture.id === this.state.selectedFurniture
						)[0]
					}
				/>
			</View>
		);
	}
}

export default Main;

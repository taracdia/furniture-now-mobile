import React from "react";
import { SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { changeFurnitureNumber } from "../redux/ActionCreators";
import { secondaryColor } from "../Colors";
import { TextInput } from "react-native-gesture-handler";

const mapDispatchToProps = {
	changeFurnitureNumber: (furnitureId, number) =>
		changeFurnitureNumber(furnitureId, number),
};

function CartWidget(props) {
	const { furniture } = props;

	const [shownNumber, setShownNumber] = React.useState(furniture.quantity);

	const changeNumber = newQuantity => {
		props.changeFurnitureNumber(furniture.id, newQuantity);
		setShownNumber(newQuantity);
	};
	return (
		<>
			<Icon
				name="minus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => {
					if (furniture.quantity > 0) {
						changeNumber(furniture.quantity - 1);
					}
				}}
			/>

			<SafeAreaView>
				<TextInput
					value={shownNumber.toString()}
					keyboardType="numeric"
					onChange={event => changeNumber(+event.nativeEvent.text)}
				/>
			</SafeAreaView>
			<Icon
				name="plus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => {
					changeNumber(furniture.quantity + 1);
				}}
			/>
		</>
	);
}

export default connect(null, mapDispatchToProps)(CartWidget);

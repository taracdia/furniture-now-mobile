import React from "react";
import { SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";

import { secondaryColor } from "../Colors";
import { TextInput } from "react-native-gesture-handler";

function CartWidget(props) {
	const { number, changeNumber } = props;
	return (
		<>
			<Icon
				name="minus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => {
					if (number > 0) {
						changeNumber(number - 1);
					}
				}}
			/>

			<SafeAreaView>
				<TextInput
					value={number.toString()}
					keyboardType="numeric"
					onSubmitEditing={event =>
						changeNumber(+event.nativeEvent.text)
					}
				/>
			</SafeAreaView>
			<Icon
				name="plus"
				type="font-awesome"
				color={secondaryColor}
				raised
				reverse
				onPress={() => changeNumber(number + 1)}
			/>
		</>
	);
}

export default CartWidget;

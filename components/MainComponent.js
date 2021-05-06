import React, { Component } from "react";
import {FURNITURES} from "../shared/furnitures";
import { Text, View } from 'react-native';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            furnitures: FURNITURES
        }
    }

    render () {
        return (
            <Directory furnitures={this.state.furnitures} />
        );
    }
}

export default Main;
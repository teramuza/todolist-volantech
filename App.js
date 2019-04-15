import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';

import store from './src/store'

//screens
import Splash from './src/screens/splash'

import Home from './src/screens/home'
import Detail from './src/screens/detail'
import AddTodo from './src/screens/addTodo'
import EditTodo from './src/screens/editTodo'
// import Setting from './src/screens/setting'



const AppContents = createStackNavigator({
	//contentscreens here
	home : {
		screen : Home,
	},
	detail : {
		screen : Detail
	},
	addTodo : {
		screen : AddTodo
	},
	editTodo : {
		screen : EditTodo
	},
	// setting : {
	// 	screen : Setting
	// }
})

const AppNavigator = createSwitchNavigator({
	splash : {
		screen : Splash,
	},
	contents : AppContents,
})

const AppRoot = createAppContainer(AppNavigator);

export default class Root extends Component {
	render(){
		return(
			<Provider store={store}>
				<AppRoot />
			</Provider>
		)
	}
}
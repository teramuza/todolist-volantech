import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { Alert, StatusBar, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Thumbnail, View, Left, Right, Button, Icon, Text, Footer } from 'native-base'

class Splash extends Component {

	componentDidMount(){
		setTimeout(()=> this.props.navigation.navigate('contents'), 500)
	}

	render() {
		return (
			<Container>
			<StatusBar  backgroundColor='#fff' barStyle="default" />
				<Content style={{backgroundColor: '#fff'}}>
					<View style={{alignItems: 'center', alignContent: 'center', paddingTop: '60%', flexDirection: 'column'}}>
						<Image style={{ height: 120, width: 120}} source={require('../assets/img/logo.png')}/>
						<Text style={{color: '#999', paddingTop: 20, fontFamily: '', fontSize: 30 }}>Todo</Text>
					</View>
				</Content>
				<Footer style={{backgroundColor: '#fff'}}>
					<Text style={{color: '#969696', fontSize: 12}}>Copyright {'\u00A9'} 2019  by teramuza.xyz </Text>
				</Footer>
			</Container>
		)
	}
}

export default connect()(Splash)


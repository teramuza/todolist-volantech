import React, { Component } from 'react'
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar, AsyncStorage, Alert, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail, Footer, Textarea } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

import HeadForm from '../components/headForm'
import {addTodo} from '../actions/todos'

class AddNote extends Component{
	static navigationOptions = ({ navigation }) => ({
    	header: null,
    })

    constructor(props) {
      	super(props)
    
      	this.state = {
      		date: undefined,
            isDateTimePickerVisible : false,
            dateObj : {},
            text : '',
      	}
    }

    stringDate(d = new Date()) {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const day = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri","Sat"]
        const hours = `${d.getHours()}`
        const minutes = `${d.getMinutes()}`
        let h = '00'
        let m = '00'

        if(hours.length < 2){ h = `0${hours}`}
        else{ h = `${hours}`}

        if(minutes.length < 2) { m = `0${minutes}`}
        else{ m = `${minutes}`}
        const dateOut = {
            mon : `${month[d.getMonth()]}`, 
            date :`${d.getDate()}`, 
            year :`${d.getFullYear()}`, 
            day : `${day[d.getDay()]}`, 
            hour : h, 
            min : m,
            fullDate : d
        }
        return dateOut
    }

    componentWillMount(){
    	this.insertDateVal()
    }

    async insertDateVal(val = new Date()){
        const date = this.stringDate(val)
        dateOut = `${date.day}, ${date.mon} ${date.date}`
        await this.setState({date : dateOut, dateObj : date})
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    _handleDateTimePicked = (date) => {
        this.insertDateVal(date)
        this._hideDateTimePicker()
    }

    async handleSubmit() {
        let todos = this.props.todos.data
        const contents = this.state.text
        const datetime = this.state.dateObj.fullDate
        const body = {contents, datetime, isDone : false}
        todos.push(body)
        await this.props.dispatch(addTodo(todos))
        console.warn(this.props.todos.data);
        this.props.navigation.goBack()
    }

    render() {
    	return (
    		<Container>
                <StatusBar hidden={false} barStyle="default" style={{backgroundColor: '#fff'}}/>
                <HeadForm 
                onCancel={()=> this.props.navigation.goBack()} 
                titleHead={this.state.date} 
                onPressHead={()=> this._showDateTimePicker()} 
                onConfirm={()=> this.handleSubmit()}
                />

        		<Content style={{backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10}}>
        		<View style={{flexDirection: 'row', flex: 1, paddingLeft: 10}}>
        			<View style={{paddingRight: 10, flexDirection: 'row'}}>
                        <Text 
                        style={{fontSize: 30, textAlign:'right', color: '#9153fe'}} 
                        onPress={()=> this._showDateTimePicker()}>{this.state.dateObj.hour}</Text>
                        <Text 
                        style={{fontSize: 20, textAlign:'right', color: '#975eff', paddingTop: 4}} 
                        onPress={()=> this._showDateTimePicker()}>.{this.state.dateObj.min}</Text>
                    </View>
        		</View>
                        		
                <View style={{paddingTop: 10, paddingLeft: 7}}>
                    <Textarea rowSpan={15} placeholder="type anything here..." onChangeText={(text)=> this.setState({text})}/>

        		</View>
                <DateTimePicker
                    date={this.state.dateObj.fullDate}
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDateTimePicked}
                    onCancel={this._hideDateTimePicker}
                />

        		</Content>
        		
    		</Container>
    	)
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
export default connect(mapStateToProps)(AddNote)

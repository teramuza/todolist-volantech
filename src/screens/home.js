import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';

class Home extends Component{
    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    constructor(props) {
        super(props);
    
        this.state = {
            date : undefined,
        };
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
	getStringDateTime(d){
        const date = this.stringDate(d)
        let stringDate = ''
        if(d === new Date()){
            stringDate = 'Today'
        }else{
            stringDate = `${date.mon} ${date.date}, ${date.year} - ${date.day}`
        }
        const output = {hour : date.hour, min : date.hour, stringDate}
        return output
    }

    componentWillMount(){
        this.today()

    }
    today(){
        const date = this.stringDate()
        curDate = `${date.mon} ${date.date}, ${date.year}`
        this.setState({date : curDate})
    }
    
    strTrunc = (str, length, ending) => {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
    };

    renderItem = ({item, index}) => {
        const datetime = this.getStringDateTime(new Date(item.datetime))
    	return(
    		<List>
			    <ListItem noBorder thumbnail style={{flex: 1, flexDirection: 'row', borderBottomWidth: 0.5, paddingVertical: 15}} onPress={()=> this.props.navigation.navigate('detail')}>
			        <View style={{flex: 1, paddingRight: 10}}>
			            <Text style={{fontSize: 24, textAlign:'right', color: '#9153fe'}}>{datetime.hour}</Text>
			            <Text style={{fontSize: 16, textAlign:'right', color: '#975eff'}}>.{datetime.min}</Text>
			        </View>
			        <View style={{flex: 9, borderLeftWidth: 0.4, paddingLeft: 10, borderLeftColor: '#ddd'}}>
			            <Text style={{color: '#9045f9', fontWeight: 'bold', fontSize: 18}}>{datetime.stringDate}</Text>
			            <Text style={{fontSize: 14, color: '#969696', paddingTop: 5}}>{item.contents}</Text>
			        </View>
			        <View style={{flex: 1, paddingRight: 5}}>
			        	{this.checkDone(item)}
			        </View>
			        
			    </ListItem>
			</List>
    	)
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
    	return (
            <Container>
                <StatusBar backgroundColor='#fff' barStyle="default" animated={true}/>
                <Header searchBar style={{backgroundColor: '#f5f5f5', }} androidStatusBarColor='#fff' iosBarStyle="dark-content">
                    <Icon name="search" style={{color: '#444', marginTop: 14, marginLeft: 12}}/>
                    <Input 
                      placeholder="find something" 
                      placeholderTextColor="#444" 
                      style={{marginTop: 2, paddingLeft: 10, color: '#fcf3cf'}}
                    />
                </Header>
                
                <Content style={{backgroundColor: '#f9f9f9'}}>
                    <View style={{flexDirection: 'column', paddingTop: 18, height: 200, backgroundColor: '#fff'}}>
                        <Image source={require('../assets/img/headbg2.png')} style={{width: '100%', height: '120%', position: 'absolute'}}/>

                        <View style={{ backgroundColor: 'transparent',  flexDirection: 'row', paddingLeft: 40, paddingVertical: 30, paddingBottom: 10}}>
                            <View>
                                <Image source={require('../assets/img/user.png')} style={{width: 60, height: 60, borderRadius: 100, borderWidth: 2, borderColor: '#fff'}}/>
                            </View>
                            <View style={{paddingLeft: 20, paddingBottom: 10}}>
                                <Text style={{color: '#fff', fontSize: 28, fontWeight:'100'}}>Hi, User</Text>
                                <Text style={{color: '#fff', fontSize: 20, paddingTop: 5}}>{this.state.date}</Text>
                                <Text style={{color: '#fff', fontSize: 12, paddingTop: 25}}>2 ToDo | 3 Pending ToDo</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingVertical: 7, paddingHorizontal: 7, backgroundColor: '#fff'}}>
			            <FlatList
	                        data={this.props.todos.data}
	                        keyExtractor={this._keyExtractor}
	                        renderItem={this.renderItem}
                    	/>
			        </View>
			    </Content>
                
                <Fab style={{backgroundColor: '#8053fe'}} position="bottomRight" onPress={() => this.props.navigation.navigate('addTodo')}>
                	<Icon name='add'/>
                </Fab>
            </Container>
        )
    }

    checkDone(item){
    	if(item.isDone) return(
    		<Icon name="checkmark" style={{color: '#994ff9', fontSize: 26}}/>
    	)
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
export default connect(mapStateToProps)(Home)
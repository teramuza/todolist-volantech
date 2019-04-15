import React from 'react';
import { Header,View, Text, Icon } from 'native-base';

const HeadForm = ({onCancel, titleHead, onPressHead, onConfirm}) => (

    <View>
    <Header style={{backgroundColor: '#F5F5F5'}} androidStatusBarColor='#fff' iosBarStyle="default">
    	<View style={{ flexDirection: 'row', flex : 1}}>
    		<View style={{flex : 1,paddingTop: 18}}>
    			<Icon name="close" type="MaterialIcons" style={{color: '#303030', paddingLeft: 3, fontSize: 20}} onPress={onCancel}/>
    		</View>

    		<View style={{flex : 6, paddingTop: 17, alignItems: 'center'}}>
    			<Text onPress={onPressHead}>{titleHead}</Text>
    		</View>

    		<View style={{flex : 1, paddingTop: 18}}>
    		<Icon name="save" type="MaterialIcons" style={{color: '#303030', fontSize: 20, paddingLeft: 20}} onPress={onConfirm} />
    		</View>
    	</View>
    </Header>
    </View>
)

export default HeadForm
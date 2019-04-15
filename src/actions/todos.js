import AsyncStorage from '@react-native-community/async-storage';

export const addTodo = (body) => {

	return {
		type : 'ADD_TODO',
		payload : body
	}
}

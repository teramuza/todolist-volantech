let initialValue = {
	data : [
		{
			contents : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum tristique erat at hendrerit. Donec et lorem eu est iaculis.',
			datetime : '2019-03-24T10:12:00.000Z',
			isDone : false
		},
		{
			contents : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum tristique erat at hendrerit. Donec et lorem eu est iaculis.',
			datetime : '2019-04-04T22:31:00.000Z',
			isDone : true
		},
		{
			contents : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum tristique erat at hendrerit. Donec et lorem eu est iaculis.',
			datetime : '2019-04-15T15:19:00.000Z',
			isDone : true
		}
	]
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	  	case 'GET_TODOS':
	  		return {
	  			...state,
	  			data : action.payload
	  		}
	  	case 'ADD_TODO':
	  		return {
	  			...state,
	  			data : action.payload
	  		}

	  	default:
	    	return state;	   
	}
}


function strFind(str){
	const dictonary=['pro', 'gram', 'merit', 'program', 'it', 'programmer'];

	for (var i = 0; i <= dictonary.length; i++) {
		if(str.search(dictonary[i]) > 0){
			console.log(dictonary[i]);
		}
	}
}

module.exports = strFind
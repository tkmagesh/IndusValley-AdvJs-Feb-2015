function getSpinner(){
	var count = 0;
	function inc(){
		return ++count;
	}
	function dec(){
		return --count;
	}
	return {
		up : inc,
		down : dec
	}
}

var spinner = (function (){
	var count = 0;
	function inc(){
		return ++count;
	}
	function dec(){
		return --count;
	}
	return {
		up : inc,
		down : dec
	}
})();

//up, down -> methods

spinner.up() //=> 1
spinner.up() //=> 2
spinner.up() //=> 3
spinner.up() //=> 4

spinner.down() //=> 3
spinner.down() //=> 2
spinner.down() //=> 1
spinner.down() //=> 0
spinner.down() //=> -1



function getPrimeFinder(){
	var cache = {};
	function checkPrime(n){
		console.log("Running the algo...");
		if (n <= 3 ) return true;
		for(var i=0;i<=(n/2);i++)
			if (n % i === 0) return false;
		return true;
	}
	function isPrime(n){
		if (typeof cache[n] === "undefined"){
			cache[n] = checkPrime(n);
		}
		return cache[n];
	}
	return isPrime;
}
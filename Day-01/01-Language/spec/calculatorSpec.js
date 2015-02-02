describe("A Calculator", function(){
	it("Should be able to add 2 numbers", function(){
		//Arrange
		var n1 = 10,
			n2 = 20,
			expectedResult = 30;

		//Act
		var result = add(n1,n2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add 2 numbers in string format", function(){
		//Arrange
		var n1 = "10",
			n2 = "20",
			expectedResult = 30;

		//Act
		var result = add(n1,n2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to treat non numeric strings as zero", function(){
		//Arrange
		var n1 = 10,
			n2 = "abc",
			expectedResult = 10;

		//Act
		var result = add(n1,n2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add functions returning numbers", function(){
		//Arrange
		var f1 = function(){ return 10; },
			f2 = function(){ return 20; },
			expectedResult = 30;

		//Act
		var result = add(f1,f2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add functions returning numbers in string format", function(){
		//Arrange
		var f1 = function(){ return "10"; },
			f2 = function(){ return "20"; },
			expectedResult = 30;

		//Act
		var result = add(f1,f2);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should be able to add functions returning functions returning numbers in string format", function(){
		//Arrange
		var f1 = function(){ return function(){ return "10"; }; },
			f2 = function(){ return function(){ return "20"; }; },
			expectedResult = 30;

		//Act
		var result = add(f1,f2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to only one number", function(){
		//Arrange
		var n1 = 10,
			expectedResult = 10;

		//Act
		var result = add(n1);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should return zero by default", function(){
		//Arrange
		var expectedResult = 0;

		//Act
		var result = add();

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add varying number of numbers", function(){
		//Arrange
		var	expectedResult = 100;

		//Act
		var result = add(10,20,30,40);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should be able to add array of numbers", function(){
		//Arrange
		var nos1 = [10,20],
			nos2 = [30,40],
			expectedResult = 100;

		//Act
		var result = add(nos1, nos2);

		//Assert
		expect(result).toBe(expectedResult);
	});

	it("Should be able to add array of numbers and numbers in string format", function(){
		//Arrange
		var nos1 = [10,"20"],
			nos2 = [30,"40"],
			expectedResult = 100;

		//Act
		var result = add(nos1, nos2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add functions returning array of numbers", function(){
		//Arrange
		var f1 = function(){ return [10,30]; },
			f2 = function(){ return [20,40]; },
			expectedResult = 100;

		//Act
		var result = add(f1,f2);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add array of functions returning array of numbers", function(){
		//Arrange
		var f1 = function(){ return [10,30]; },
			f2 = function(){ return [20,40]; },
			expectedResult = 100;

		//Act
		var result = add([f1,f2]);

		//Assert
		expect(result).toBe(expectedResult);
	});
	it("Should be able to add nested array of numbers", function(){
		//Arrange
		var nos = [10,[20,[30,[40]]]],
			expectedResult = 100;

		//Act
		var result = add(nos);

		//Assert
		expect(result).toBe(expectedResult);
	});

});
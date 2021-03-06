matrices = {};

$(document).ready(function() {
	// console.log(arguments);
	newMatrix();
	bindEvents();
});

var bindEvents = function() {
	$("#btnAgregarMatriz").bind("click", function()	{
		newMatrix();
	});
	$("#btnOperar").bind("click", function()	{
		proccesString($("#operation").val());
	});
};

var newMatrix = function() {
	var newId = getNextChar();
	console.log(newId)
	matrices[newId] = new Matriz([
		[1,-1,0],
	 	[0,1,0],
	 	[2,0,1]
	], newId);
	$("#originales").append(matrices[newId].toHTML());
};

var getNextChar = function() {
	return String.fromCharCode(65 + Object.keys(matrices).length);
};

var proccesString2 = function(string) {
	console.log(string.indexOf("TRANS(") !== -1)
	if (string.indexOf("TRANS(") !== -1) {
		var index = string.indexOf("TRANS(");
		var newId = string.substring(index + 6, index + 7);
		if (matrices.hasOwnProperty(newId)) {
			$("#resultados").append(matrices[newId].transpuesta().toHTML());
		} else {
			throw "NO EXISTE LA MATRIZ";
		}
		return;
	}
	var sumas = string.split("+");
	var resultado;
	for (var i = 0; i < sumas.length; i++) {
		var multiplicaciones = sumas[i].split("*");
		if (resultado === undefined) {
			if (isNaN(multiplicaciones[0])) {
				resultado = new Matriz(matrices[multiplicaciones[0]]);
				continue;
			} else {
				resultado = multiplicaciones[0];
			}
		}
		console.log(multiplicaciones[0])
		console.log(sumas[i])
		for (var j = 1; j < multiplicaciones.length; j++) {
			// console.log(matrices[])
			if (isNaN(multiplicaciones[j])) {
				resultado = MULTIPLICAR_MATRICES(resultado, matrices[multiplicaciones[j]])
			} else {
				resultado *= multiplicaciones[j];
			}
		}
		// if (multiplicaciones.length > 1) {
		// 	continue;
		// }
		if (sumas.length > 1) {
			resultado = SUMAR_MATRICES(resultado, matrices[sumas[i]]);
		}
	}
	$("#resultados").append(resultado.toHTML());
	// var resultado;
	// for (var i = 0; i < sumas.length; i++) {
	//  	var restas = sumas[i].split("-");
	//  	for (var j = 0; j < restas.length; j++) {
	  	
	//  	}
	//  	console.log(restas)
	// }
}

var SUMAR_MATRICES = function(lMatriz, rMatriz) {
	var newId = lMatriz.id + "+" + rMatriz.id;
	nMatrix = new Matriz(lMatriz);
	nMatrix.setId(newId);
	nMatrix.sumar(rMatriz);
	$("#resultados").append(nMatrix.toHTML());
	return nMatrix;
}
var MULTIPLICAR_MATRICES = function(lMatriz, rMatriz) {
	var newId = lMatriz.id + "*" + rMatriz.id;
	var nMatrix;
	if (!isNaN(lMatriz)) {
		lMatriz = new fraccion(lMatriz);
		nMatrix = new Matriz(rMatriz);
		nMatrix.multiplicar(lMatriz);
	} else {
		nMatrix = new Matriz(lMatriz);
		nMatrix.multiplicar(rMatriz);
	}
	nMatrix.setId(newId);
	$("#resultados").append(nMatrix.toHTML());
	return nMatrix;
}

var proccesString = function(cadena) {
   	var testArray = cadena.split("+");
	var total = 0;
	var _self = this;
	// for(String ele : testArray){
	testArray.forEach(function(ele, index) {
		var multiplicaciones = ele.split("*");
	   	if (multiplicaciones.length > 1) {
	   		if (multiplicaciones[0].indexOf("TRANS") !== -1) {
	   			tieneTranspuesta(multiplicaciones[0]);
	   		}
	   		if (multiplicaciones[0].indexOf("REDUCIDA") !== -1) {
	   			console.log("REST")
	   			tieneReducidad(multiplicaciones[0]);
	   		}
	   		var totalMulti = matrices[multiplicaciones[0]];
         	multiplicaciones.forEach(function(multiplicacion, indexM) {
         		if (indexM === 0) {
         			return;
         		}
		   		if (multiplicacion.indexOf("TRANS") !== -1) {
		   			tieneTranspuesta(multiplicacion);
		   		}
		   		if (multiplicacion.indexOf("REDUCIDA") !== -1) {
		   			tieneReducidad(multiplicacion);
		   		}
				totalMulti = MULTIPLICAR_MATRICES(totalMulti, matrices[multiplicacion]);
         	});
         	if (total === undefined) {
         		total = totalMulti;
         	} else {
         		total = SUMAR_MATRICES(total, totalMulti);
         	}
	   	} else {
	   		if (index === 0) {
		   		if (multiplicaciones[0].indexOf("TRANS") !== -1) {
		   			tieneTranspuesta(multiplicaciones[0]);
		   		}
		   		if (multiplicaciones[0].indexOf("REDUCIDA") !== -1) {
		   			tieneReducidad(multiplicaciones[0]);
		   		}
	   			total = matrices[multiplicaciones[0]];
	   			console.log(total.toString())
	   			return;
	   		}
	   	}
		if (testArray.length > 1) {
	   		if (testArray[index].indexOf("TRANS") !== -1) {
	   			_self.tieneTranspuesta(testArray[index]);
	   		}
	   		if (testArray[index].indexOf("REDUCIDA") !== -1) {
	   			tieneReducidad(testArray[index]);
	   		}
			total = SUMAR_MATRICES(total, matrices[testArray[index]]);
		}
		
	});
	$("#resultados").append(total.toHTML());
	return total;   
}

// var tieneTranspuesta = function(cadena) {

// 	if (cadena.indexOf("TRANS(") !== -1) {
// 		var index = cadena.indexOf("TRANS(");
// 		var newId = cadena.substring(index + 6, index + 7);
// 		if (matrices.hasOwnProperty(newId)) {
// 			matrices["TRANS(" + newId + ")"] = matrices[newId].transpuesta();
// 			matrices["TRANS(" + newId + ")"].setId("TRANS(" + newId + ")");
// 			$("#resultados").append(matrices["TRANS(" + newId + ")"].toHTML());
// 		} else {
// 			throw "NO EXISTE LA MATRIZ";
// 		}
// 	}
// }

var tieneTranspuesta = function(cadena) {

	if (cadena.indexOf("TRANS(") !== -1) {
		var index = cadena.indexOf("TRANS(");
		var newId = cadena.substring(index + 6, index + cadena.indexOf(")"));
		console.log(newId)
		if (matrices.hasOwnProperty(newId)) {
			matrices["TRANS(" + newId + ")"] = matrices[newId].transpuesta();
			matrices["TRANS(" + newId + ")"].setId("TRANS(" + newId + ")");
			$("#resultados").append(matrices["TRANS(" + newId + ")"].toHTML());
		}
		//  else if (newId.indexOf("TRANS") !== -1){
		// 	tieneTranspuesta(newId + ")");
		// 	tieneTranspuesta(cadena);
		// } 
		else {
			throw "NO EXISTE LA MATRIZ";
		}
	}
}
var tieneReducidad = function(cadena) {

	if (cadena.indexOf("REDUCIDA(") !== -1) {
		var index = cadena.indexOf("REDUCIDA(");
		var newId = cadena.substring(index + 9, index + cadena.indexOf(")"));
		console.log(newId)
		if (matrices.hasOwnProperty(newId)) {
			matrices[newId].resolverSistema();
			matrices["REDUCIDA(" + newId + ")"] = matrices[newId].reducida;
			// matrices["REDUCIDA(" + newId + ")"].setId("REDUCIDA(" + newId + ")");
			// $("#resultados").append(matrices["REDUCIDA(" + newId + ")"].toHTML());
		}
		//  else if (newId.indexOf("TRANS") !== -1){
		// 	tieneTranspuesta(newId + ")");
		// 	tieneTranspuesta(cadena);
		// } 
		else {
			throw "NO EXISTE LA MATRIZ";
		}
	}
}
        
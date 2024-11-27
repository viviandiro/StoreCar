
var num1= parseFloat(prompt("Por favor, ingresa numero1:"));
var num2= prompt("Por favor, ingresa numero2:");
var num3= prompt("Por favor, ingresa numero3:");
// Mostrar el nombre ingresado en la consola
console.log("Hola, " + num1+ "!");

// numero mayor 
if (num1>=num2 && num1>=num3){
    alert("el numero mayor es: "+ num1);
}else if (num2>=num1 && num2>=num3){
    alert("el numero mayor es: "+ num2);
}else{
    alert("el numero mayor es: "+ num3);
}

// numero menor

if (num1<=num2 && num1<=num3){
    alert("el numero menor es: "+ num1);
}else if (num2<=num1 && num2<=num3){
    alert("el numero menor es: "+ num2);
}else{
    alert("el numero menor es: "+ num3);
}
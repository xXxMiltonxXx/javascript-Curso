console.log('Hola Mundo')
//tipos de datos 
// String:'a'o "a"
// Boolean:true
// null:nulo
// Number:123343434
// undefined. variable que no ha sido definida
// Object:objecto(estructura para agrupar datos)
////////////////////////Variables////////////////////
///definición
//var
// var miPrimeraVariable='XD'
//let
//tipo cadena de texto 
let miPrimeraVariable='Mi primera variable en JS'
// console.log(miPrimeraVariable);
//reasignar valor(mutabilidad)
miPrimeraVariable='valor cambiado'
// console.log(miPrimeraVariable);
//definir un valor booleano 
let miBoolean=true
let miOtroBool=false
//tipo numerico 
let miNumero=0
let miNumero2= 12
let miNumero3= -256
//tipo no definido
let indef //variable sin valor definido 
//tipo null
let nulo=null
//
//console.log(miNumero,miNumero2,miNumero3,miBoolean,miPrimeraVariable,indef,nulo)
//const
//tipo objeto 
//es una agrupación de datos, estos datos hacen sentido entre si 
///objeto vacio
const miPrimerObjeto={}
//objeto
//los objetos tiene propiedades
const miObjeto={
    unNumero:12,
    unString: 'XDXEDXDdfdf',
    unaCondicion: true,
}
//mostrar el objeto
// console.log(miObjeto)
//mostrar una propiedad del objeto 
// console.log(miObjeto.unString)
///Arreglos
//arreglo vacio
const arrVacio=[]
//arreglo con propiedades
const arr=[1,2,'hola','mundo',miObjeto]
// console.log(arr)
arr.push('xd')
// console.log(arr)
arrVacio.push(5)
arrVacio.push(3)
arrVacio.push(1)
arrVacio.push('hola')
console.log(arrVacio)
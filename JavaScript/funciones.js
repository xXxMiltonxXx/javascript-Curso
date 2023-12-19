/////////////////////////////////////////
//////Funciones js////
///parabra reservada
//UNA FUNCION RESIVE ARGUMENTOS 
// function iterar(arg1/*agurmento*/ ){
    
//     for(let i=0;i<arg1.length;i++){
//         // console.log(arg1[i])
//     }
// }
// const arrNum=[1,2,3,5]
// const arrNombre=['Jesus',' Luis','Manuel','Jose']
// //se llama a la funcion dos veces
// iterar(arrNum/* paramentro*/)
// iterar(arrNombre/* paramentro*/)
// ///////////////////////////////////
// /////
// function suma(num1,num2){
//     return num1+num2;
// }
// const resultado1=suma(1,2)
// const resultado2=suma(3,5)
// const resultado3=suma(resultado1+resultado2)
// console.log('resultado1', resultado1)
// console.log('resultado2', resultado2)
// console.log('resultado3', resultado3)
/////////////////////////////////////////////////
//callback
// function sumar(a,b,cb){
//     const r=a+b
//     cb(r)
// }
// //las funciones puede ser valores es decir se puede enviar como argumentos
// function callback(result){
//     console.log('resultado',result);
// }
// // callback(6)
// sumar(2,3,callback)
/////////////////////////////////////////////////////////////////////
//Fat arrow function
//tien return implisito 
// const miFatArrowFunction=(a,b)=>a+b
// const r=miFatArrowFunction(1,2)
// console.log(r)
// //otra forma de definir Fat arrow function
// const otraFat=(a,b)=>{
//     return a+b
// }
// const resul=otraFat(1,2)
// console.log(resul)

/////////////////////////////////////////////////////////////////
//funcion anonima
function sumar(a,b,cb){
    const r=a+b
    cb(r)
}
//no es recomendable usarla
sumar(2,3,function(r){
    console.log('soy func anonima y mi rest es ', r)
})

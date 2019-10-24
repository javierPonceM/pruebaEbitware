import ObtenerDatos from './obtenerDatos';

let sujeto1 = new ObtenerDatos();
let sujeto2 = new ObtenerDatos();
let sujeto3 = new ObtenerDatos();

sujeto1.getNombre();
sujeto1.getEdad();
sujeto1.getSexo();
sujeto1.getPeso();
sujeto1.getAltura();

sujeto2.getNombre();
sujeto2.getEdad();
sujeto2.getSexo();

sujeto3.setInfo('maria', 22, 'mujer', 1.70, 70);

console.log('el sujeto 1 tiene: ', sujeto1.statusPeso());
console.log('el sujeto 2 tiene: ', sujeto2.statusPeso());
console.log('el sujeto 3 tiene: ', sujeto3.statusPeso());

console.log('el sujeto 1 es: ', sujeto1.statusEdad());
console.log('el sujeto 2 es: ', sujeto2.statusEdad());
console.log('el sujeto 3 es: ', sujeto3.statusEdad());

console.log('La informacion de sujeto 1:', sujeto1.getAllInfo());
console.log('La informacion de sujeto 2:', sujeto2.getAllInfo());
console.log('La informacion de sujeto 3:', sujeto3.getAllInfo());

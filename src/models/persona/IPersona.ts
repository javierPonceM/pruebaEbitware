import Char from '../../config/types/charType';

interface IPersona {
    nombre: String;
    edad: Number;
    NSS: String;
    sexo: Char;
    peso: Number;
    altura: Number;
    calcularImc(peso: Number, altura: Number): Number;
    esMayorDeEdad(edad: Number): Boolean;
    comprobarSexo(sexo: Char): Boolean;
    toString(): String;
    generaNSS(): String;
};
export default IPersona;

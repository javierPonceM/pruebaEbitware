import IPersona from './IPersona';
import Char from '../../config/types/charType';

class Persona implements IPersona {
    sexObjt:Char  = new Char('H');
    private nombre: String = '';
    private edad: Number = 0;
    private NSS: String = '';
    private sexo = this.sexObjt.getValue;
    private peso: Number = 0;
    private altura: Number = 0;

    calcularImc(peso: Number, altura: Number): Number;
    esMayorDeEdad(edad: Number): Boolean;
    comprobarSexo(sexo: Char): Boolean;
    toString(): String;
    generaNSS(): String;

}
export default Persona;
import Char from '../../config/types/charType';

interface IPersona {
    nombre: string;
    edad: number;
    NSS: string;
    sexo: string;
    peso: number;
    altura: number;
    calcularImc(): number;
    esMayorDeEdad(): boolean;
    comprobarSexo(sexo: Char): boolean;
    tostring(): string;
    generaNSS(): string;
    getGender(sexstring?:string):string;
};
export default IPersona;

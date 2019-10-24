import IPersona from './IPersona';
import Char from '../../config/types/charType';

class Persona implements IPersona {
    private nombre: string;
    private edad: number;
    private NSS: string;
    private sexo: string;
    private peso: number;
    private altura: number;

    // constructor() {
    //     this.nombre = '';
    //     this.edad = 0;
    //     this.NSS = this.generaNSS();
    //     this.sexo = this.getSexo();
    //     this.peso = 0;
    //     this.altura = 0;
    // }
    // constructor(nombre: string, edad: number, sexo: string | undefined) {
    //     this.nombre = nombre;
    //     this.edad = edad;
    //     this.NSS = this.generaNSS();
    //     this.sexo = this.getSexo(sexo);
    //     this.peso = 0;
    //     this.altura = 0;
    // }
    // constructor(nombre: string, edad: number, nss: string, sexo: string | undefined, peso: number, altura: number) {
    //     this.nombre = nombre;
    //     this.edad = edad;
    //     this.NSS = nss;
    //     this.sexo = this.getSexo(sexo);
    //     this.peso = peso;
    //     this.altura = altura;
    // }
    constructor(nombre?: string, edad?: number, sexo?: string, nss?: string, peso?: number, altura?: number) {
        this.nombre = nombre || '';
        this.edad = edad || 0;
        this.NSS = nss || this.generaNSS();
        this.sexo = this.getGender(sexo);
        this.peso = peso || 0;
        this.altura = altura || 0;
    }
    public set setNombre(nombre: string) {
        this.nombre = nombre;
    }
    public set setEdad(edad: number) {
        this.edad = edad;
    }
    public set setSexo(sexo: string) {
        this.sexo = sexo;
    }
    public set setPeso(peso: number) {
        this.peso = peso;
    }
    public set setAltura(altura: number) {
        this.altura = altura;
    }

    public get getNombre() {
        return this.nombre;
    }
    public get getEdad() {
        return this.edad;
    }
    public get getSexo() {
        return this.sexo;
    }
    public get getPeso() {
        return this.peso;
    }
    public get getAltura() {
        return this.altura;
    }

    calcularImc(): number {
        let imc: number;
        if (this.altura > 0 && this.peso > 0)
            imc = this.peso / Math.pow(this.altura, 2);
        else imc = 20;
        if (this.sexo === 'H') {
            if (imc > 25) return 1;
            else  if (imc >= 20 && imc <= 25) return 0;
            else  return -1;
        } else {
            if (imc > 24) return 1;
            else if (imc >= 19 && imc <= 24) return 0;
            else return -1;
        }
    }

    esMayorDeEdad(): boolean {
        if (this.edad > 18) return true;
        else return false;
    }
    private comprobarSexo(sexo: Char): boolean {
        let sex = this.sexo.toLowerCase();
        let conditionH: boolean = sex === 'h' || sex === 'hombre';
        let conditionM: boolean = sex === 'm' || sex === 'mujer';

        if (conditionH || conditionM) return true;
        else return false;
    }
    tostring(): string {
        return JSON.stringify(this);
    }
    private generaNSS(): string {
        let cadenaRandom: string;
        let numerosRandom: number;
        let nss: string = '';
        //generar una cadena de numeros y letras semialeatorio de tamaño 8
        for (let i = 0; i < 8; i++) {
            let multiploRandom: number = Math.random();
            if (multiploRandom < 0.6) {//obtener un char random, letras mayusculas en codigo ascii del 65 al 90, se hace desde 91 ya que math.random excluye el uno
                let multiploRandom: number = Math.random() * (91 - 65) + 65;
                let letraRandom = String.fromCharCode(multiploRandom);
                nss = nss.concat(letraRandom);
            } else {//para obtener un numero random, numeros del 0 al 9 en codigo ascii del 48 al 57, se hace desde el 58 ya que math.random excluye el 1
                let multiploRandom: number = Math.random() * (58 - 48) + 48;
                let numeroRandom = String.fromCharCode(multiploRandom);
                nss = nss.concat(numeroRandom);
            }
        }
        return nss;
    }
    getGender(sexstring?: string): string {
        const hombre: string = 'H', mujer: string = 'M';
        if (sexstring) sexstring = sexstring.toLowerCase();
        if (sexstring === 'hombre' || sexstring === 'h') return hombre;
        if (sexstring === 'mujer' || sexstring === 'm') return mujer;
        return hombre;
    }

}
export default Persona;
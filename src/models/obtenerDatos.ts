import Persona from './persona/persona';
import { question, questionInt, questionFloat, prompt} from 'readline-sync';
class ObtenerDatos {
    persona: Persona;
    constructor() {
        this.persona = new Persona();
    }
    /**
     * metodos que piden nombre, edad, sexo, peso y altura de una persona mediante el teclado
     */
    getNombre() {
        let input = question('ingresa tu nombre: ');
        this.persona.setNombre = input;
    }
    getEdad() {
        const input =  questionInt('ingresa tu edad?');
        this.persona.setEdad = input;
    }
    getSexo() {
        let input = question('¿Cuál es tu sexo? (H hombre, M mujer): ');
        this.persona.setSexo = input;
    }
    getPeso() {
        let input = questionFloat('ingresa tu peso (en kg): ');
        this.persona.setPeso = input;
    }
    getAltura() {
        let input = questionFloat('ingresa tu altura (en metros): ');
        this.persona.setAltura = input;
    }

    setInfo(nombre: string, edad: number, sexo: string, altura: number, peso: number) {
        this.persona.setNombre = nombre;
        this.persona.setEdad = edad;
        this.persona.setSexo = sexo;
        this.persona.setAltura = altura;
        this.persona.setPeso = peso;

    }
    statusPeso(): string {
        let status: number;
        status = this.persona.calcularImc();
        if (status === -1) return 'falta de peso';
        else if (status === 0) return 'peso ideal';
        else return 'sobre peso';
    }

    statusEdad(): string {
        let status: boolean;
        status = this.persona.esMayorDeEdad();
        if (status) return 'Mayor de edad';
        else return 'menor de edad';
    }
    getAllInfo() {
        return this.persona.tostring();
    }
}
export default ObtenerDatos;
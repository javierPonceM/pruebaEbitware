import Persona from './persona/persona';
import * as readLine from 'readline';
class ObtenerDatos {
    persona: Persona;
    private rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    constructor() {
        this.persona = new Persona();
    }

    /**
     * metodo que pide nombre, edad, sexo, peso y altura de una persona
     */
    getNombre() {
        console.log('ingresa tu nombre: ');
        this.rl.on('line', (line) => {
            this.persona.setNombre = line;
        });
    }
    getEdad() {
        console.log('ingresa tu edad: ');
        this.rl.on('line', (line) => {
            this.persona.setEdad = Number(line);
        });

    }
    getSexo() {
        console.log('¿Cuál es tu sexo?: ');
        this.rl.on('line', (line) => {
            this.persona.setSexo = line;
        });
    }
    getPeso() {
        console.log('ingresa tu peso (en kg): ');
        this.rl.on('line', (line) => {
            this.persona.setPeso = Number(line);
        });
    }
    getAltura() {
        console.log('ingresa tu altura (en metros): ');
        this.rl.on('line', (line) => {
            this.persona.setAltura = Number(line);
        });
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

interface IPersona {
    calcularImc(): number;
    esMayorDeEdad(): boolean;
    tostring(): string;
    getGender(sexstring?:string):string;
};
export default IPersona;

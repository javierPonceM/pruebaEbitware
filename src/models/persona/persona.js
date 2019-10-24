"use strict";
exports.__esModule = true;
var Persona = /** @class */ (function () {
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
    function Persona(nombre, edad, sexo, nss, peso, altura) {
        this.nombre = nombre || '';
        this.edad = edad || 0;
        this.NSS = nss || this.generaNSS();
        this.sexo = this.getGender(sexo);
        this.peso = peso || 0;
        this.altura = altura || 0;
    }
    Object.defineProperty(Persona.prototype, "setNombre", {
        set: function (nombre) {
            this.nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "setEdad", {
        set: function (edad) {
            this.edad = edad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "setSexo", {
        set: function (sexo) {
            this.sexo = sexo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "setPeso", {
        set: function (peso) {
            this.peso = peso;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "setAltura", {
        set: function (altura) {
            this.altura = altura;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "getNombre", {
        get: function () {
            return this.nombre;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "getEdad", {
        get: function () {
            return this.edad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "getSexo", {
        get: function () {
            return this.sexo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "getPeso", {
        get: function () {
            return this.peso;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "getAltura", {
        get: function () {
            return this.altura;
        },
        enumerable: true,
        configurable: true
    });
    Persona.prototype.calcularImc = function () {
        var imc;
        if (this.altura > 0 && this.peso > 0)
            imc = this.peso / Math.pow(this.altura, 2);
        else
            imc = 20;
        if (this.sexo === 'H') {
            if (imc > 25)
                return 1;
            if (imc >= 20 && imc <= 25)
                return 0;
            if (imc < 20)
                return -1;
        }
        else {
            if (imc > 24)
                return 1;
            if (imc >= 19 && imc <= 24)
                return 0;
            if (imc < 19)
                return -1;
        }
    };
    Persona.prototype.esMayorDeEdad = function () {
        if (this.edad > 18)
            return true;
        else
            return false;
    };
    Persona.prototype.comprobarSexo = function (sexo) {
        var sex = this.sexo.toLowerCase();
        var conditionH = sex === 'h' || sex === 'hombre';
        var conditionM = sex === 'm' || sex === 'mujer';
        if (conditionH || conditionM)
            return true;
        else
            return false;
    };
    Persona.prototype.tostring = function () {
        return JSON.stringify(this);
    };
    Persona.prototype.generaNSS = function () {
        var cadenaRandom;
        var numerosRandom;
        var nss = '';
        //generar una cadena de numeros y letras semialeatorio de tamaño 8
        for (var i = 0; i < 8; i++) {
            var multiploRandom = Math.random();
            if (multiploRandom < 0.6) { //obtener un char random, letras mayusculas en codigo ascii del 65 al 90, se hace desde 91 ya que math.random excluye el uno
                var multiploRandom_1 = Math.random() * (91 - 65) + 65;
                var letraRandom = String.fromCharCode(multiploRandom_1);
                nss = nss.concat(letraRandom);
            }
            else { //para obtener un numero random, numeros del 0 al 9 en codigo ascii del 48 al 57, se hace desde el 58 ya que math.random excluye el 1
                var multiploRandom_2 = Math.random() * (58 - 48) + 48;
                var numeroRandom = String.fromCharCode(multiploRandom_2);
                nss = nss.concat(numeroRandom);
            }
        }
        return nss;
    };
    Persona.prototype.getGender = function (sexstring) {
        var hombre = 'H', mujer = 'M';
        if (sexstring)
            sexstring = sexstring.toLowerCase();
        if (sexstring === 'hombre' || sexstring === 'h')
            return hombre;
        if (sexstring === 'mujer' || sexstring === 'm')
            return mujer;
        return hombre;
    };
    return Persona;
}());
exports["default"] = Persona;

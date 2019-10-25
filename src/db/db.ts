import mysql, { Pool } from 'mysql';
import { get } from 'config';
class DB {
    private host: string = get('dbConection.host');
    private user: string = get('dbConection.user');
    private password: string = get('dbConection.password');
    private database: string = get('dbConection.db');
    private port: number = get('dbConection.port');
    private poolConection: Pool;

    constructor() {
        this.poolConection = mysql.createPool({
            host: get('dbConection.host'),
            user: get('dbConection.user'),
            password: get('dbConection.password'),
            database: get('dbConection.db'),
            port: get('dbConection.port'),
            multipleStatements: true
        });
        this.connect();
        this.createDataBase();
    }

    connect() {
        this.poolConection.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                throw new Error('No se puede conectar a la base de datos');
            } else { console.log('Base de datos conectada'); }
        });
    }
    makeQuery(sentense: string, values: Array<string | number>) {
        return new Promise((resolve, reject) => {
            this.poolConection.query(sentense, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });

        });
    }

    async createDataBase() {
        let response;
        const sqlSentence = `
        CREATE DATABASE IF NOT EXISTS test;
        
        USE test;
        
        CREATE TABLE IF NOT EXISTS Cajeros (
          cajero INT NOT NULL PRIMARY KEY,
          nomApels varchar(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Productos (
            Producto int(10) NOT NULL  PRIMARY KEY,
            Nombre varchar(255) NOT NULL,
            Precio decimal(13, 4) NOT NULL
          );
          
          CREATE TABLE IF NOT EXISTS maquinas_registradoras (
              Maquina int(10) NOT NULL  PRIMARY KEY,
              Piso int(10) NOT NULL
              );
        CREATE TABLE IF NOT EXISTS Venta (
            id int(11) NOT NULL  auto_increment PRIMARY KEY,
            Cajero int(10) NOT NULL,
            Maquina int(10) NOT NULL,
            Producto int(10) NOT NULL
        );
        
        `;
        response = await this.makeQuery(sqlSentence, []);
        return response;
    }

    async fillTables() {
        for (let i = 0; i < 5; i++) {
            let response1, response2, response3;
            let nombreProducto = `producto${i}`;
            let producto = i;
            let precioProducto = Math.random() * 100;
            let nombreCajero = `cajero${i}`;
            let cajero = i;
            let maquina = i;
            let piso = i;

            let inserIntoProductos = `insert into Productos(producto,nombre,precio) values(?,?,?)`;
            let inserIntoCajeros = `insert into Cajeros(Cajero,NomApels) values(?,?)`;
            let inserIntoMaqReg = `insert into maquinas_registradoras(maquina,piso) values(?,?)`;
            try {
                response1 = await this.makeQuery(inserIntoProductos, [producto, nombreProducto, precioProducto]);
                response2 = await this.makeQuery(inserIntoCajeros, [cajero, nombreCajero]);
                response3 = await this.makeQuery(inserIntoMaqReg, [maquina, piso]);

            } catch (error) {
                console.log(error)
            }

        }

        for (let i = 0; i < 40; i++) {
            let response4;
            let producto = Math.floor(Math.random() * 5);
            let cajero = Math.floor(Math.random() * 5);
            let maquina = Math.floor(Math.random() * 5);

            let inserIntoVenta = `insert into Venta(cajero,maquina,producto) values(?,?,?)`;
            try {
                response4 = await this.makeQuery(inserIntoVenta, [cajero, maquina, producto]);

            } catch (error) {
                console.log(error)
            }
        }
    }
    async getVentasPorProducto() {
        let response;
        let selectVentasPorProduct = `select count(*) as ventas, producto from venta group by producto order by ventas desc;`;
        try {
            response = await this.makeQuery(selectVentasPorProduct, []);
            return response;
        } catch (error) {
            console.log(error)
            return 'Server Error';
        }
    }

    async reporteCompletoVentas() {
        let response;
        let selectReporComplVentas = `select cajeros.nomapels, venta.producto, productos.nombre, productos.precio, maquinas_registradoras.piso from cajeros
        inner join venta on cajeros.cajero=venta.cajero
        inner join productos on venta.producto=productos.producto
        inner join maquinas_registradoras on venta.maquina=maquinas_registradoras.maquina
        order by cajeros.cajero
        ;`;

        try {
            response = await this.makeQuery(selectReporComplVentas, []);
            return response;
        } catch (error) {
            console.log(error)
            return 'Server Error';
        }
    }

    async ventasPorPiso(){
        let response;
        let selectVentasPorPiso=`select maquinas_registradoras.piso, count(venta.maquina) as ventas from maquinas_registradoras 
        inner join venta on maquinas_registradoras.maquina=venta.maquina group by maquinas_registradoras.maquina
        order by maquinas_registradoras.piso asc;`;
        try {
            response = await this.makeQuery(selectVentasPorPiso, []);
            return response;
        } catch (error) {
            console.log(error)
            return 'Server Error';
        }
    }
//pendiente
    async ventasTotalesPorCajero(){
        let response;
        let selectVentasTotPorCajero=`select venta.cajero,cajeros.nomApels as nombre,
        venta.producto as produc_vendido,  productos.precio from venta 
        inner join productos on venta.producto=productos.Producto
        inner join cajeros on cajeros.cajero = venta.cajero
        order by venta.cajero;`;
        try {
            response = await this.makeQuery(selectVentasTotPorCajero, []);
            return response;
        } catch (error) {
            console.log(error)
            return 'Server Error';
        }
    }
    //pendiente
    async ventasPorPisoInferiorA5000(){
        let response;
        let selectVentasPorPisoInfA5000=`select cajeros.cajero, cajeros.nomapels, count(venta.producto),count(venta.producto)*productos.precio as ventaTotal from cajeros
        inner join venta on cajeros.cajero=venta.cajero
        inner join productos on venta.producto=productos.producto
        group by venta.cajero
        order by cajeros.cajero asc
        ;`;
        try {
            response = await this.makeQuery(selectVentasPorPisoInfA5000, []);
            return response;
        } catch (error) {
            console.log(error)
            return 'Server Error';
        }
    }


}

export default DB;
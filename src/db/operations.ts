import DB from './db';
let newDb = new DB();
newDb.fillTables();

export async function ventasPorProducto(){
    let result = await newDb.getVentasPorProducto();
    return result;
}
export async function reporteCompletoVentas(){
    let result = await newDb.reporteCompletoVentas();
    return result;
}
export async function ventasPorPiso(){
    let result = await newDb.ventasPorPiso();
    return result;
}
export async function ventasTotalesPorCajero(){
    let result = await newDb.ventasTotalesPorCajero();
    return result;
}
export async function ventasPorPisoInferiorA5000(){
    let result = await newDb.ventasPorPisoInferiorA5000();
    return result;
}
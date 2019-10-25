import express, { Request, Response, NextFunction } from "express";
import { makeGet, makePost, makePut } from '../services/requestToServer';
import { 
  ventasPorProducto, 
  reporteCompletoVentas, 
  ventasPorPiso, 
  ventasTotalesPorCajero, 
  ventasPorPisoInferiorA5000 
} from '../db/operations';
const router = express.Router();

router.get("/cliente/todos", async (req: Request, res: Response, next: NextFunction) => {
  let response;
  response = await makeGet();
  res.json(response);

});

router.post("/cliente/nuevo", async (req: Request, res: Response, next: NextFunction) => {
  let response;
  let data = req.body;
  response = await makePost(data);
  console.log('post response', response);
  res.status(200).send(response);
});

router.put("/cliente/:numCliente", async (req: Request, res: Response, next: NextFunction) => {
  let response;
  let data = req.body;
  let numCliente = parseInt(req.params.numCliente);
  response = await makePut(data, numCliente);
  res.json(response);
});
//paths about db operations
router.get("/ventasBy/producto", async (req: Request, res: Response, next: NextFunction) => {
  let response = await ventasPorProducto();
  res.send(response);
});
router.get("/ventasBy/reporteCompleto", async (req: Request, res: Response, next: NextFunction) => {
  let response = await reporteCompletoVentas();
  res.send(response);
});
router.get("/ventasBy/piso", async (req: Request, res: Response, next: NextFunction) => {
  let response = await ventasPorPiso();
  res.send(response);
});
router.get("/ventasBy/cajero", async (req: Request, res: Response, next: NextFunction) => {
  let response = await ventasTotalesPorCajero();
  res.send(response);
});
router.get("/ventasBy/piso/inferiores", async (req: Request, res: Response, next: NextFunction) => {
  let response = await ventasPorPisoInferiorA5000();
  res.send(response);
});
export default router;

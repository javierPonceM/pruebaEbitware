import express, { Request, Response, NextFunction } from "express";
import { makeGet, makePost, makePut } from '../services/requestToServer'
const router = express.Router();

router.get("/cliente/todos", async (req: Request, res: Response, next: NextFunction) => {
  let response;
  // {
  //   "Nombre": "Juan",
  //   "Apellidos": "Perez Hernandez",
  //   "Nombre_Usuario": "Ju",
  //   "Correo_Electronico": "jperez@hotmail.com",
  //   "Contraseña": "juanitoperez"
  //   }
  response = await makeGet();
  res.json(response);

});
router.post("/cliente/nuevo", (req: Request, res: Response, next: NextFunction) => {
  let response;
  let data = req.body;
  response = makePost(data);
  res.json(response);
});
router.put("/cliente/:numCliente", (req: Request, res: Response, next: NextFunction) => {
  let response;
  let data = req.body;
  let numCliente = req.params.numCliente
  response = makePut(data, numCliente);
  res.json(response);
});

export default router;

// { "Cliente_ID": 1, "Nombre_Usuario": "Juana", "Contraseña": "usnavy", "Nombre": "Usnavy Marina", "Apellidos": "Valencia", "Correo_Electronico": "juanaperez@hotmail.com", "Edad": 39, "Estatura": 1.8, "Peso": 60, "Genero_ID": 1, "Actividad_Fisica_ID": 1, "Dieta_ID": 4, "Objetivo_ID": 1, "IMC": 0, "GEB": 1500, "ETA": 0, "Peso_Maximo": 0, "Peso_Minimo": 0, "AF": 0, "Gasto_Energetico_Total": 0, "Tipo_Cliente_ID": 1, "Activo": true, "Orden": 0, "Fecha_Creacion": "2015-03-09T14:34:03", "Fecha_Actualizacion": "2016-05-13T16:49:00", "Usuario_ID": 2, "Visible": true, "De_Sistema": false }
import express from "express";
const router = express.Router();
import Persona from '../models/persona/persona';
router.get("/", function(req, res, next) {
  let persona1 = new Persona();
  let persona2 = new Persona('javier',26,'mujer');
  let persona3 = new Persona('javier',26,'mujer','hghbgh',50,1.85);

  // res.render("index", { title: "Express, bitch" });
  res.json({
    persona1,
    persona2,
    persona3
  });
});

export default router;

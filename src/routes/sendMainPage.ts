import express, { Request, Response, NextFunction } from "express";
import path from 'path';
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    // res.send('hola');
    res.sendFile(`${process.cwd()}/public/index.html`);
});

export default router;

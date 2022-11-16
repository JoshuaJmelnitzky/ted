import { usuario } from './usuarioController.js';
import { Router } from "express";
const router = Router();


router.get('/', usuario);


export default router;


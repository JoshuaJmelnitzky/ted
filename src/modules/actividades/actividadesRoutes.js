import express from 'express';
const { Router } =  express;
const router = new Router();
import { getActividades } from './actividadesController.js'

router.get('/', getActividades);

export default router;
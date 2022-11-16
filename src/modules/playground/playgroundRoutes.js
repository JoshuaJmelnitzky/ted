import { Router } from "express";
import { playground, saveSolution } from './playgroundController.js';
const router = Router();


router.get("/:id", playground);

router.post('/:id', saveSolution);

export default router;

 
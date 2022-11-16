import { Router } from "express";
import { renderIndex, renderAbout, perfil } from "../controllers/index.controller.js";
import activitiesRoutes from '../modules/actividades/actividadesRoutes.js'
import playgroundRoutes from '../modules/playground/playgroundRoutes.js';
import usuariosRoutes from '../modules/usuario/usuarioRoutes.js'


const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
// router.get("/nada",nada);

router.use('/actividades', activitiesRoutes);
router.use('/playground', playgroundRoutes);
router.use("/ranking", usuariosRoutes)
router.get("/perfil",perfil)


export default router;

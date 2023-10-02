import { Router } from "express";
import verAutenticacion from "../middlewares/autenticacion.js";
import {
    listarEspecialidades,
    registrarEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad,
    listarUnaEspecialidad
} from "../controllers/especialidades_controller.js";

const router = Router()

router.get('/especialidades', verAutenticacion, listarEspecialidades)
router.get('/especialidad/:id', verAutenticacion, listarUnaEspecialidad)
router.post('/especialidad/registrar', verAutenticacion, registrarEspecialidad)
router.put('/especialidad/actualizar/:id', verAutenticacion, actualizarEspecialidad)
router.delete('/especialidad/eliminar/:id', verAutenticacion, eliminarEspecialidad)

export default router;
import { Router } from "express";
import verAutenticacion from "../middlewares/autenticacion.js";
import {
    listarCitas,
    listarUnaCita,
    registrarCita,
    actualizarCita,
    eliminarCita
} from "../controllers/citas_controller.js";

const router = Router()

router.get('/citas', verAutenticacion, listarCitas)
router.get('/cita/:id', verAutenticacion, listarUnaCita)
router.post('/cita/registrar', verAutenticacion, registrarCita)
router.put('/cita/actualizar/:id', verAutenticacion, actualizarCita)
router.delete('/cita/eliminar/:id', verAutenticacion, eliminarCita)

export default router
import { Router } from "express";
import verAutenticacion from "../middlewares/autenticacion.js";
import {
    listarPacientes,
    listarUnPaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../controllers/pacientes_controller.js";

const router = Router()

router.get('/pacientes', verAutenticacion, listarPacientes)
router.get('/paciente/:id', verAutenticacion, listarUnPaciente)
router.post('/paciente/registrar', verAutenticacion, registrarPaciente)
router.put('/paciente/actualizar/:id', verAutenticacion, actualizarPaciente)
router.delete('/paciente/eliminar/:id', verAutenticacion, eliminarPaciente)

export default router
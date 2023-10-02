import { Router } from "express";
import { login, registro, listarUsuarios } from "../controllers/usuario_controller.js";

const router = Router()

router.get('/usuarios', listarUsuarios)
router.post('/login', login)
router.post('/registrar', registro)

export default router;
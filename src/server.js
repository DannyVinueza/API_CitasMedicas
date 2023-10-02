import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerUsuario from './routes/usuario_routes.js'
import routerEspecialidades from './routes/expecialidades_routes.js'
import routerPacientes from './routes/pacientes_routes.js'
import routerCitas from './routes/citas_routes.js'

const app = express()
dotenv.config()

app.set('port', process.env.PORT || 3000)
app.use(cors())

app.use(express.json())

app.use('/api', routerUsuario)
app.use('/api', routerEspecialidades)
app.use('/api', routerPacientes)
app.use('/api', routerCitas)

app.get('/',(req,res)=>{
    res.json({1:'Examen final Daniel - Danny'})
})

export default app;
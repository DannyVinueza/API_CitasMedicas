import Pacientes from "../models/Pacientes.js";
import sequelize from "../database.js";

const listarPacientes = async (req,res)=>{
    Pacientes.findAll()
    .then((pacientes)=>{
        res.status(200).json(pacientes)
    })
    .catch((error)=>{
        console.log('Error al listar los pacientes', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const listarUnPaciente = async (req,res)=>{
    const {id} = req.params
    
    try{
        const seUPa = await Pacientes.findByPk(id)
        if(!seUPa) {
            return res.status(400).json({msg:`El paciente  ${id} no se encuentra registrada`})
        }
        res.status(200).json(seUPa)
    }catch(error){
        console.log('Paciente no encontrada', error)
        res.status(500).json({error:'Error intenro del servidor'})
    }
}

const registrarPaciente = async (req, res)=>{
    const {nombre, apellido, cedula, fecha_nacimiento, genero, ciudad, direccion, telefono, email} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})
    const sePa = await Pacientes.findOne({
        where:{
            cedula: req.body.cedula
        }
    })
    if(sePa) return res.status(400).json({msg:`El paciente con cedula ${cedula} ya se encuentra registrada`})
    
    const nuevoPaciente = ({
        nombre, 
        apellido, 
        cedula, 
        fecha_nacimiento, 
        genero, 
        ciudad, 
        direccion, 
        telefono, 
        email
    })
    await Pacientes.create(nuevoPaciente)
    .then(()=>{
        res.status(200).json({msg:'El paciente ha sido registrado'})
    })
    .catch((error)=>{
        console.log('Error al registrar al paciente: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const actualizarPaciente = async (req,res)=>{
    const {id} = req.params
    const upPac = await Pacientes.findByPk(id)
    if(!upPac) return res.status(400).json({msg:`El paciente ${id} no se encuentra registrada`})
    if(upPac.cedula !== req.body.cedula){
        const sePa = await Pacientes.findOne({
            where:{
                cedula: req.body.cedula
            }
        })
        if(sePa) return res.status(400).json({msg:`EL paciente con # de cedula ${req.body.cedula} ya se encuentra registrada`})
    }

    const actPac = ({
        nombre: req.body.nombre || upPac.nombre, 
        apellido: req.body.apellido || upPac.apellido, 
        cedula: req.body.cedula || upPac.cedula, 
        fecha_nacimiento: req.body.fecha_nacimiento || upPac.fecha_nacimiento, 
        genero: req.body.genero || upPac.genero, 
        ciudad: req.body.ciudad || upPac.ciudad, 
        direccion: req.body.direccion || upPac.direccion, 
        telefono: req.body.telefono || upPac.telefono, 
        email: req.body.email || upPac.email
    })

    await Pacientes.update(actPac,{
        where:{
            id:id
        }
    })
    .then(()=>{
        res.status(200).json({msg:'Paciente actualizado'})
    })
    .catch((error)=>{
        console.log('Error al actualizar el paciente:', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarPaciente = async (req,res)=>{
    const {id} = req.params
    const dePac = await Pacientes.findByPk(id)
    if(!dePac) return res.status(400).json({msg:`El paciente con ${id} no se encuentra registrado`})
    await dePac.destroy()
    .then(()=>{
        res.status(200).json({msg:'Paciente eliminado'})
    })
    .catch((error)=>{
        console.log('Error al eliminar al paciente', error)
        res.status(500).json('Error interno del servidor')
    })
}

export{
    listarPacientes,
    listarUnPaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente
}
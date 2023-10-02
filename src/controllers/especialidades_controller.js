import Especialidades from "../models/Especialidades.js";
import sequelize from "../database.js";
import { QueryTypes } from "sequelize";

const listarEspecialidades = async (req,res)=>{
    Especialidades.findAll()
    .then((especialidades)=>{
        res.status(200).json(especialidades)
    })
    .catch((error)=>{
        console.log('Error al listar las especialides', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const listarUnaEspecialidad = async (req,res)=>{
    const {id} = req.params
    
    try{
        const seUEsp = await Especialidades.findByPk(id)
        if(!seUEsp) {
            return res.status(400).json({msg:`La especialidad ${id} no se encuentra registrada`})
        }
        res.status(200).json(seUEsp)
    }catch(error){
        console.log('Escepecialidad no encontrada', error)
        res.status(500).json({error:'Error intenro del servidor'})
    }
}

const registrarEspecialidad = async (req, res)=>{
    const {nombre, descripcion} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})
    const seEsp = await Especialidades.findOne({
        where:{
            nombre: req.body.nombre
        }
    })
    if(seEsp) return res.status(400).json({msg:`La especialidad ${nombre} ya se encuentra registrada`})
    const codEsp = 'ES-' + generarCodigo();
    const nuevaEspecialidad = ({
        codigo: codEsp,
        nombre,
        descripcion
    })
    await Especialidades.create(nuevaEspecialidad)
    .then(()=>{
        res.status(200).json({msg:'La expecialidad ha sido registrada'})
    })
    .catch((error)=>{
        console.log('Error al registrar la especialidad: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const actualizarEspecialidad = async (req,res)=>{
    const {id} = req.params
    const upEsp = await Especialidades.findByPk(id)
    if(!upEsp) return res.status(400).json({msg:`La especialidad ${id} no se encuentra registrada`})
    if(upEsp.nombre !== req.body.nombre){
        const seEsp = await Especialidades.findOne({
            where:{
                nombre: req.body.nombre
            }
        })
        if(seEsp) return res.status(400).json({msg:`La especialidad ${req.body.nombre} ya se encuentra registrada`})
    }

    const actEsp = ({
        codigo: upEsp.codigo,
        nombre: req.body.nombre || upEsp?.nombre,
        descripcion: req.body.descripcion || upEsp?.descripcion
    })

    await Especialidades.update(actEsp,{
        where:{
            id:id
        }
    })
    .then(()=>{
        res.status(200).json({msg:'Especialidad actualizada'})
    })
    .catch((error)=>{
        console.log('Error al actualiza la especialidad:', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarEspecialidad = async (req,res)=>{
    const {id} = req.params
    const deEsp = await Especialidades.findByPk(id)
    if(!deEsp) return res.status(400).json({msg:`La especialidad ${id} no se encuentra registrada`})
    await deEsp.destroy()
    .then(()=>{
        res.status(200).json({msg:'Especialidad eliminada'})
    })
    .catch((error)=>{
        console.log('Error al eliminar la especialidad', error)
        res.status(500).json('Error interno del servidor')
    })
}

function generarCodigo(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaRandom = '';

    for(let i = 0; i < 10; i++){
        const indiceRandom = Math.floor(Math.random() * caracteres.length);
        cadenaRandom += caracteres.charAt(indiceRandom)
    }

    return cadenaRandom;
}

export {
    listarEspecialidades,
    registrarEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad,
    listarUnaEspecialidad
}


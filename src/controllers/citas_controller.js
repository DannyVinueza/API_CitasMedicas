import Citas from "../models/Citas.js";
import Especialidades from "../models/Especialidades.js";
import Pacientes from "../models/Pacientes.js";

const listarCitas = async (req,res)=>{
    Citas.findAll()
    .then((citas)=>{
        res.status(200).json(citas)
    })
    .catch((error)=>{
        console.log('Error al listar todas las citas', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const listarUnaCita = async (req,res)=>{
    const {id} = req.params
    
    try{
        const seCita = await Citas.findByPk(id)
        if(!seCita) {
            return res.status(400).json({msg:`La cita  ${id} no se encuentra registrada`})
        }
        res.status(200).json(seCita)
    }catch(error){
        console.log('Cita no encontrada', error)
        res.status(500).json({error:'Error intenro del servidor'})
    }
}

const registrarCita = async (req, res)=>{
    const {descripcion, paciente, especialidad} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})
    //Paciente existe
    const sePa = await Pacientes.findOne({
        where:{
            cedula: req.body.paciente
        }
    })
    if(!sePa) return res.status(400).json({msg:`El paciente con cedula ${paciente} no se encuentra registrado`})

    const seEsp = await Especialidades.findOne({
        where:{
            nombre: req.body.especialidad
        }
    })
    if(!seEsp) return res.status(400).json({msg:`La especialidad ${especialidad} no se encuentra registrada`})

    const seCita = await Citas.findOne({
        where:{
            id_paciente: sePa.id,
            id_especialidad: seEsp.id
        }
    })

    if(seCita) return res.status(400).json({msg:`La cita para el paciente con nombre ${sePa.nombre} y especialidad ${seEsp.nombre} ya se encuentra registrada cambie de especialidad o de paciente`})

    
    const codCita = 'CI-' + generarCodigo();
    const nuevaCita = ({
        codigo: codCita,
        descripcion,
        id_paciente: sePa.id,
        id_especialidad: seEsp.id
    })
    await Citas.create(nuevaCita)
    .then(()=>{
        res.status(200).json({msg:'La cita ha sido registrada'})
    })
    .catch((error)=>{
        console.log('Error al registrar la cita: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const actualizarCita = async (req, res)=>{
    const {id} = req.params
    const {descripcion, paciente, especialidad} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})

    const upCita = await Citas.findByPk(id)
    if(!upCita) return res.status(400).json({msg:`No se encuentra la cita con id ${id}`})
    //Paciente existe
    const sePa = await Pacientes.findOne({
        where:{
            cedula: req.body.paciente
        }
    })
    if(!sePa) return res.status(400).json({msg:`El paciente con cedula ${paciente} no se encuentra registrado`})

    const seEsp = await Especialidades.findOne({
        where:{
            nombre: req.body.especialidad
        }
    })
    if(!seEsp) return res.status(400).json({msg:`La especialidad ${especialidad} no se encuentra registrada`})

    if(sePa.cedula !== req.body.paciente){
        const seCita = await Citas.findOne({
            where:{
                id_paciente: sePa.id,
            }
        })
    
        if(seCita) return res.status(400).json({msg:`La cita para el paciente con nombre ${sePa.nombre}  ya se encuentra registrada`})
    }
    
    const nuevaUpCita = ({
        codigo: upCita.codigo,
        descripcion: req.body.descripcion || upCita?.descripcion,
        id_paciente: sePa.id,
        id_especialidad: seEsp.id
    })
    await Citas.update(nuevaUpCita,{
        where:{
            id
        }
    })
    .then(()=>{
        res.status(200).json({msg:'La cita ha sido actualizada'})
    })
    .catch((error)=>{
        console.log('Error al actualizar la cita: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarCita = async (req,res)=>{
    const {id} = req.params
    const deCita = await Pacientes.findByPk(id)
    if(!deCita) return res.status(400).json({msg:`La cita con ${id} no se encuentra registrada`})
    await deCita.destroy()
    .then(()=>{
        res.status(200).json({msg:'Cita eliminada'})
    })
    .catch((error)=>{
        console.log('Error al eliminar la cita', error)
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

export{
    listarCitas,
    listarUnaCita,
    registrarCita,
    actualizarCita,
    eliminarCita
}
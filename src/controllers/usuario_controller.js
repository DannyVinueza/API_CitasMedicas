import Usuarios from "../models/Usuarios.js";
import sequelize from "../database.js";
import generarJWT from "../helpers/crearJWT.js";

const login = async (req, res)=>{
    const {email, password} = req.body
    console.log(email)
    console.log(password)
    if(Object.values(req.body).includes("")) return res.status(404).json({msg:'Lo sentimos pero debe de llenar todos los campos'})
    const user = await Usuarios.findOne({
        where: {
            email
        }
    })

    if(!user) return res.status(404).json({msg:'Usuario o contraseña incorrectos'})
    
    const verPassword = await user.matchPassword(password);
    if(!verPassword) return res.status(401).json({msg:'Usuario o contraseña incorrectos'})
    const {nombre, apellido } = user
    const token = generarJWT(user.id)
    
    res.status(200).json({
        id: user.id,
        token,
        nombre,
        apellido,
        email
    })
}

const registro = async (req, res)=>{
    const {nombre, apellido, email, password} = req.body;
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})

    const user = await Usuarios.findOne({
        where:{
            email
        }
    })

    if(user) return res.status(400).json({msg: 'Lo sentimos el email ya se encuentra registrado'})

    const newUser = new Usuarios(req.body)

    newUser.password = await newUser.encrypPassword(password)
    const sql = `INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?,?,?,?)`;
    sequelize.query(sql, {
        replacements:[
            newUser.nombre,
            newUser.apellido,
            newUser.email,
            newUser.password,
        ],
        type: sequelize.QueryTypes.INSERT,
    })
    .then(()=>{
        res.status(200).json({mensaje: 'Usuario creado existosamente'})
    })
    .catch((error)=>{
        console.error('Error al crear el usuario', error)
        res.status(500).json({error: 'Error interno del servidor', error})
    })
}

const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuarios.findAll({ attributes: { exclude: ['password'] } });
  
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };

export {
    login,
    registro,
    listarUsuarios
}
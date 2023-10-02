import {DataTypes } from 'sequelize';
import sequelize from '../database.js';
import bcrypt from "bcryptjs"

const Usuarios = sequelize.define('usuarios',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        apellido:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING(120),
            allowNull: false
        },
    },{
        tableName: 'usuarios',
        timestamps: false,
    })

// Encriptacion de la password
Usuarios.prototype.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(5);
    const passwordEncryp = await bcrypt.hash(password, salt);
    return passwordEncryp;
}

//Verificar si el password ingresado es el mismo de la BD desencriptando
Usuarios.prototype.matchPassword = async function(password){
    const response = await bcrypt.compare(password, this.password);
    return response;
}

// Generar token
Usuarios.prototype.crearToken = function(){
    const tokenGenerado = Math.random().toString(36).slice(2);
    this.token = tokenGenerado;
    return tokenGenerado;
}

export default Usuarios;
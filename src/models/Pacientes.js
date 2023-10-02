import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Pacientes = sequelize.define('pacientes',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    apellido:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cedula:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    fecha_nacimiento:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    genero:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ciudad:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false,
    }
},{
    tableName: 'pacientes',
    timestamps: false,
});

export default Pacientes;
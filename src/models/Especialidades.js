import {DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Especialidades = sequelize.define('especialidades',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        codigo:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },{
        tableName: 'especialidades',
        timestamps: false,
    })

export default Especialidades;
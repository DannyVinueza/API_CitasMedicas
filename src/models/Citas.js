import {DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Pacientes from './Pacientes.js';
import Especialidades from './Especialidades.js';

const Citas = sequelize.define('citas',{
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
    descripcion:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    id_paciente:{
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    id_especialidad:{
       type: DataTypes.INTEGER,
       allowNull: false,
    }
},{
    tableName: 'citas',
    timestamps: false,
})

Citas.belongsTo(Pacientes, { foreignKey: 'id_paciente' });
Citas.belongsTo(Especialidades, { foreignKey: 'id_especialidad' });

export default Citas;
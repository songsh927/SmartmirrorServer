import Sequelize from 'sequelize';
import { sequelize } from '../db/database.js';

export const Schedule = sequelize.define('schedules',{
    idx:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    text:{
        type: Sequelize.TEXT,
        allowNull: true
    }
},{
    sequelize : sequelize,
    timestamps : false
});

export async function getAll(){
    return Schedule.findAll({
        raw:true
    })
}

export async function getByDate(date){
    return Schedule.findAll({
        where:{date},
        raw:true
    })
}

export async function getById(idx){
    return Schedule.findByPk(idx);

}

export async function create(date, title, text){
    return Schedule.create({
        date,
        title,
        text
    },
    {raw:true});
}

export async function update(idx, date, title, text){
    return Schedule.update({
        where: {idx},})
}

export async function remove(idx){
    return Schedule.destroy({
        where:{idx},
        raw:true
    })
}
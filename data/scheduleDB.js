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

export async function getById(id){
    return Schedule.findByPk(id);

}

export async function create(date, title, text){
    return Schedule.create({
        date,
        title,
        text
    },
    {raw:true});
}

export async function update(id, date, title, text){
    return Schedule.update({
        where: {id},})
}

export async function remove(id){
    return Schedule.destroy({
        where:{id},
        raw:true
    })
}
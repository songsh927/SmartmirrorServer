import * as scheduleRepo from '../data/scheduleDB.js';
import { getSocketIO } from '../connection/socket.js';
import dayjs from 'dayjs';

//get all schedule
export async function getSchedules(req, res){
    const date = dayjs(req.query.date).format('YYYY-MM-DD');
    const data = await (date
        ? scheduleRepo.getByDate(date)
        : scheduleRepo.getAll());
    res.status(200).json(data);
}
//get particular schedule
export async function getSchedule(req, res){
    const id = req.params.id;
    const data = await scheduleRepo.getById(id);
    res.status(200).json(data)
}
//post schedule
export async function createSchedule(req, res) {
    const {date, title, text} = req.body;
    const schedule = await scheduleRepo.create(date, title, text);
    res.status(201).json(schedule);
    getSocketIO().emit('schedules', schedule)
}
//update schedule
export async function updateSchedule(req, res){
    const id = req.params.id;
    const {title, text} = req.body;
    
    const data = await scheduleRepo.update(id, title, text);

    res.status(200).json(data);

}
//delete schedule
export async function deleteSchedule(req, res){
    const id = req.params.id;
    
    await scheduleRepo.remove(id);
    res.sendStatus(204);
}
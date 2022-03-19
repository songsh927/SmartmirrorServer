import * as scheduleRepo from '../data/schedule.js';

//get all schedule
export async function getSchedules(req, res){
    const date = req.query.date;
    const data = await (date
        ? scheduleRepo.getbyDate(date)
        : scheduleRepo.getAll());
    res.status(200).json(data);
}
//get particular schedule
export async function getSchedule(req, res){
    const id = req.params.id;
    const data = await scheduleRepo.getbyId(id);
    res.status(200).json(data)
}
//post schedule
export async function createSchedule(req, res) {
    const {date, title, text} = req.body;
    const id = await scheduleRepo.create(date, title, text);
    res.status(201).json(id);
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
    
    scheduleRepo.remove(id);
    res.sendStatus(204);
}
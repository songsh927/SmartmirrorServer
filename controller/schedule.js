var scheduleData = [
    {
        'id' : '1',
        'date' : '20220319',
        'title' : '회의',
        'text' : '캡스톤 회의'
    },
    {
        'id' : '2',
        'date' : '20220320',
        'title' : '운동',
        'text' : '운동'
    },
]

//get all schedule
export async function getSchedules(req, res){
    const date = req.query.date;
    if(date){
        const data = scheduleData.filter((schedule) => schedule.date === date);
        res.status(200).json(data);
    }else{
        res.status(200).json(scheduleData);
    }
}
//get particular schedule
export async function getSchedule(req, res){
    const id = req.params.id;
    const data = scheduleData.filter((schedule) => schedule.id === id)
    if(data){
        res.status(200).json(data);
    }else{
        res.sendStatus(404)
    }
}
//post schedule
export async function createSchedule(req, res) {
    const {date, title, text} = req.body;
    const schedule = {
        id: Date.now().toString(),
        date,
        title,
        text
    };
    scheduleData = [...scheduleData, schedule];
    res.sendStatus(201);
}
//update schedule
export async function updateSchedule(req, res){
    const id = req.params.id;
    const {title, text} = req.body;
    const schedule = scheduleData.find((schedule) => schedule.id === id)
    console.log(schedule);
    if(schedule){
        schedule.title = title;
        schedule.text = text;
    }
    res.sendStatus(200);

}
//delete schedule
export async function deleteSchedule(req, res){
    const id = req.params.id;
    scheduleData = scheduleData.filter((schedule) => schedule.id !== id)
    res.sendStatus(204)
}
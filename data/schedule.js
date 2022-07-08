var scheduleData = [];

//get all
export async function getAll(){
    return scheduleData;
}

//get by date
export async function getbyDate(date){
    const schedule = scheduleData.filter(
        (schedule) => schedule.date === date
    );
    
    return schedule;
}

//get by id
export async function getbyId(id){
    const schedule = scheduleData.find(
        (schedule) => schedule.id === id
    );

    return schedule;
}

//create schedule
export async function create(date, title, text){
    const schedule = {
        id: Date.now().toString(),
        date : date.toString(),
        title : title.toString(),
        text : text.toString()
    };
    scheduleData = [...scheduleData, schedule];
    
    return schedule;
}

//update schedule
export async function update(id, title, text){
    const schedule = await getbyId(id);

    schedule.title = title;
    schedule.text = text;

    return schedule;
}

//delete schedule
export async function remove(id){
    scheduleData = scheduleData.filter(
        (schedule) => schedule.id !== id
    );
    
}

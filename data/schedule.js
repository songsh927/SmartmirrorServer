var scheduleData = [
    {
        'id' : '1',
        'date' : '20220319',
        'title' : '회의',
        'text' : '캡스톤 회의'
    },
    {
        'id' : '2',
        'date' : '20220331',
        'title' : '운동',
        'text' : '운동'
    },
    {
        'id' : '3',
        'date' : '20220320',
        'title' : '여행',
        'text' : '제주도 여행'
    },
    {
        'id' : '4',
        'date' : '20220331',
        'title' : '회의',
        'text' : '캡스톤 회의'
    },
]

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
        date,
        title,
        text
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

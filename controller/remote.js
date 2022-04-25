import requestApi from 'request';
//get status
//update status

var statusData = {
    "lightStatus" : "on",
    "curtainStatus" : "off",
    "tempStatus" : "off",
}

//TODO! 요청시 모듈의 상태 받아온후 처리

export function tempGetStatus(req, res, next){
    return res.status(200).json(statusData.tempStatus);
}
export async function tempControl(req, res){
    const {ctrl} = req.body;
    console.log(ctrl);
    if(tempGetStatus == ctrl){
        return res.status(200).json('asdf')
    }
    //requestApi.post
    statusData.tempStatus = ctrl;
    return res.status(200).json(statusData.tempStatus);
}

export async function lightGetStatus(req, res){
    return res.status(200).json(statusData.lightStatus);
}
export async function lightControl(req, res){
    const {ctrl} = req.body;
    if(statusData.lightStatus == ctrl){
        return res.status(200).json('asdf')
    }
    statusData.lightStatus = ctrl;
    return res.status(200).json(statusData.lightStatus);
    
}

export async function curtainGetStatus(req, res){
    return res.status(200).json(statusData.curtainStatus);
}
export async function curtainControl(req, res){
    const {ctrl} = req.body;
    if(statusData.curtainStatus == ctrl){
        return res.status(200).json('asdf')
    }
    statusData.curtainStatus = ctrl;
    return res.status(200).json(statusData.curtainStatus);
}

///////middleware? controller?////////
export async function getStatus(req, res){
    return res.status(200).json(statusData);
}

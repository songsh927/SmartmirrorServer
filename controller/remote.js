import requestApi from 'request';
//get status
//update status

var tempStatus = 'off';
var lightStatus = 'off';
var curtainStatus = 'off';

export function tempGetStatus(req, res, next){
    return res.status(200).json(tempStatus);
}
export async function tempControl(req, res){
    const {ctrl} = req.body;
    console.log(ctrl);
    if(tempGetStatus == ctrl){
        return res.status(200).json('asdf')
    }
    //requestApi.post
    tempStatus = ctrl;
    return res.status(200).json(tempStatus);
}

export async function lightGetStatus(req, res){
    return res.status(200).json(lightStatus);
}
export async function lightControl(req, res){
    
}

export async function curtainGetStatus(req, res){
    return res.status(200).json(curtainStatus);
}
export async function curtainControl(req, res){
    
}

///////middleware? controller?////////
export async function getStatus(req, res){

}

export async function updateStatus(req, res){

}
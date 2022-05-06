import requestApi from 'request';
import * as remoteData from '../data/remote.js';
//get status
//update status

var statusData = {
    "lightStatus" : "on",
    "curtainStatus" : "off",
    "tempStatus" : "off",
}

var lightStatus = {
    "ctrl": "off",
    "redValue": "",
    "greenValue": "",
    "blueValue": ""
}

var curtainStatus = {
    "ctrl" : "off",
    "openTime" : "",
    "closeTime" : ""
}

var tempStatus = {
    "ctrl" : "off",
    "onTime" : "",
    "offTime" : ""
}

//TODO! 요청시 모듈의 상태 받아온후 처리

export async function lightGetStatus(req, res){
    return res.status(200).json(statusData.lightStatus);
}
export async function lightControl(req, res){
    const ctrl = req.params.ctrl;
    const {redValue, greenValue, blueValue} = req.body; //조명 RGB 
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
    const ctrl = req.params.ctrl;
    const {openTime, closeTime} = req.body; //커튼 여닫는 시간예약
    if(statusData.curtainStatus == ctrl){
        return res.status(200).json('asdf')
    }
    statusData.curtainStatus = ctrl;
    return res.status(200).json(statusData.curtainStatus);
}

export function tempGetStatus(req, res, next){
    return res.status(200).json(statusData.tempStatus);
}
export async function tempControl(req, res){
    const ctrl = req.params.ctrl;
    const {onTime, offTime} = req.body; //켜짐,꺼짐 예약
    console.log(ctrl);
    if(tempGetStatus == ctrl){
        return res.status(200).json('asdf')
    }
    //requestApi.post
    statusData.tempStatus = ctrl;
    return res.status(200).json(statusData.tempStatus);
}

///////middleware? controller?////////
export async function getStatus(req, res){
    return res.status(200).json(statusData);
}

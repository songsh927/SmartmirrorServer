import request from 'request';
import 'request-promise-native';
import 'express-async-errors';

// == light == //
export async function lightGetStatus(req, res){
    requestModuleGetStatus('lightcontroller').then((body) => {
        res.status(200).json(body)
    })
}

export async function lightControl(req, res){
    const {ctrl, redValue, greenValue, blueValue} = req.body;
    requestModuleController('lightcontroller', {ctrl, redValue, greenValue, blueValue}).then((body) => {
        res.status(200).json(body)
    })
}


// == curtain== //
export async function curtainGetStatus(req, res){
    requestModuleGetStatus('curtaincontroller').then((body) => {
        res.status(200).json(body)
    })
}

export async function curtainControl(req, res){
    const {ctrl, onTimeHour, onTimeMinute, offTimeHour, offTimeMinute} = req.body;

    if({onTimeHour, onTimeMinute, offTimeHour, offTimeMinute} !== null){
        requestTimeControll('curtaincontroller', onTimeHour, onTimeMinute, offTimeHour, offTimeMinute).then((body) => {
            res.status(200).json(body);
        })
    }else{
        requestModuleController('curtaincontroller', ctrl).then((body) => {
            res.status(200).json(body)
        })
    }

    
}

// == temp == // 
export function tempGetStatus(req, res, next){
    requestModuleGetStatus('tempcontroller').then((body) => {
        res.status(200).json(body)
    })
}

export async function tempControl(req, res){
    const {ctrl, onTime, offTime} = req.body;

    if({onTimeHour, onTimeMinute, offTimeHour, offTimeMinute} !== null){
        requestTimeControll('tempcontroller', onTimeHour, onTimeMinute, offTimeHour, offTimeMinute).then((body) => {
            res.status(200).json(body);
        })
    }else{
        requestModuleController('tempcontroller', ctrl).then((body) => {
            res.status(200).json(body)
        })
    }

    
}



async function requestModuleController(inst, opts){   

    return new Promise((resolve, reject) => {
        request.post({
            uri: 'http://localhost:8080/remote/'+inst,
            body:opts,
            json: true
        },
        (error, httpResponse, body) => {
            if(!error && httpResponse.statusCode == 200){
                resolve(body);
            }else{
                reject(error);
            }
        }
        )
    })
}

async function requestModuleGetStatus(inst){
    return new Promise((resolve, reject) => {
        request({
            uri: 'http://localhost:8080/remote/' + inst
        },
        (error, httpResponse, body) => {
            if(httpResponse.statusCode == 200){
                resolve(body);    
            }else{
                reject(error);
            }
        })
    })
}

async function requestTimeControll(inst,onTimeHour, onTimeMinute, offTimeHour, offTimeMinute){
    
    var now = new Date();
    var nowHour = now.getHours();
    var nowMinute = now.getMinutes();
    var sleepUntilonTime = ((onTimeHour - nowHour)*3600 + (onTimeMinute - nowMinute)*60)*1000;
    var sleepTime =  ((offTimeHour - onTimeHour)*3600 + (offTimeMinute - onTimeMinute)*60)*1000;

    console.log(onTimeHour)
    console.log(onTimeMinute)

    return new Promise((resolve, reject) => {
        setTimeout(() => requestModuleController(inst, {"ctrl":"on"}).then((body) => {
            if(body.ctrl == "on"){
                setTimeout(() => requestModuleController(inst, {"ctrl":"off"}).then((body) => {
                    return resolve(body)
                }), sleepTime)
            }
        }), sleepUntilonTime);
    })
}
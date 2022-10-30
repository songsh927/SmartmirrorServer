import request from 'request';
import 'request-promise-native';
import 'express-async-errors';
import dayjs from 'dayjs';
/**
 * 조명 모듈 3
 * 에어컨 모듈 4
 * 커튼 모듈 5
 * ex) 조명모듈 => 192.168.0.3
 */

// == light == //
export async function lightGetStatus(req, res){
    requestModuleGetStatus('3').then((body) => {
        res.status(200).json(body)
    })
}

export async function lightControl(req, res){
    const {ctrl, redValue, greenValue, blueValue} = req.body;
    requestModuleController('3', {ctrl, redValue, greenValue, blueValue}).then((body) => {
        res.status(200).json(body)
    })
}


// == curtain== //
export async function curtainGetStatus(req, res){
    requestModuleGetStatus('3').then((body) => {
        res.status(200).json(body)
    })
}

export async function curtainControl(req, res){
    const {ctrl, onTime, offTime} = req.body;

    if(onTime !== null & offTime != null){
        requestTimeControll('5', onTime, offTime).then((body) => {
            res.status(200).json(body);
        })
    }else{
        requestModuleController('5', ctrl).then((body) => {
            res.status(200).json(body)
        })
    }

    
}

// == temp == // 
export function tempGetStatus(req, res, next){
    requestModuleGetStatus('4').then((body) => {
        res.status(200).json(body)
    })
}

export async function tempControl(req, res){
    const {ctrl, onTimeHour, onTimeMinute, offTimeHour, offTimeMinute} = req.body;

    if({onTimeHour, onTimeMinute, offTimeHour, offTimeMinute} !== null){
        requestTimeControll('4', onTimeHour, onTimeMinute, offTimeHour, offTimeMinute).then((body) => {
            res.status(200).json(body);
        })
    }else{
        requestModuleController('4', ctrl).then((body) => {
            res.status(200).json(body)
        })
    }
}

export function getStatus(req, res){
    const tempStatus = tempGetStatus();
    const lightStatus = lightGetStatus();
    const curtainStatus = curtainGetStatus();

    const data = {
        'lightStatus' : lightStatus,
        'tempStatus' : tempStatus,
        'curtainStatus' : curtainStatus
    }

    res.status(200).json(data)
}



async function requestModuleController(inst, opts){   

    console.log(inst)
    console.log(opts)

    return new Promise((resolve, reject) => {
        request.post({
            uri: '192.168.0.'+inst,
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
            uri: '192.168.0.' + inst
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

async function requestTimeControll(inst,onTime, offTime){
    
    var now = new Date();
    var sleepUntilonTime = dayjs(dayjs(onTime)).diff(now, 'ms');
    var sleepTime = dayjs(offTime).diff(dayjs(onTime),'ms');

    return new Promise((resolve, reject) => {
        setTimeout(() => requestModuleController(inst, {"ctrl":"1"})
        .then((body) => {
            if(body.statusCode == 200){
                setTimeout(() => requestModuleController(inst, {"ctrl":"0"})
                .then((body) => {
                    return resolve()//body)
                }), sleepTime)
            }
        }), sleepUntilonTime);
    })
}
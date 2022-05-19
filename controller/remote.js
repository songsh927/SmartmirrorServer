import request from 'request';
import 'request-promise-native';
import 'express-async-errors';

// var lightStatus = {
//     "ctrl": "off",
//     "redValue": "",
//     "greenValue": "",
//     "blueValue": ""
// }

// var curtainStatus = {
//     "ctrl" : "off",
//     "openTime" : "",
//     "closeTime" : ""
// }

// var tempStatus = {
//     "ctrl" : "off",
//     "onTime" : "",
//     "offTime" : ""
// }

///
var instStatus = [
    {
        "inst": "lightStatus",
        "ctrl": "off",
        "redValue": "",
        "greenValue": "",
        "blueValue": ""
    },
    {
        "inst": "curtainStatus",
        "ctrl" : "off",
        "openTime" : "",
        "closeTime" : ""
    },
    {
        "inst": "tempStatus",
        "ctrl" : "off",
        "onTime" : "",
        "offTime" : ""
    }
]
///

//TODO! 요청시 모듈의 상태 받아온후 처리
/*
// == light == //
export async function lightGetStatus(req, res){
    return res.status(200).json(lightStatus);
}

export async function lightControl(req, res){
    const ctrl = req.query.ctrl;
    const redValue = req.query.redValue;
    const greenValue = req.query.greenValue;
    const blueValue = req.query.blueValue; //조명 RGB 
    if(lightStatus.ctrl == ctrl){
        return res.status(200).json(lightStatus)
    }
    lightStatus.ctrl = ctrl;
    return res.status(200).json(lightStatus);
    
}

// == curtain== //
export async function curtainGetStatus(req, res){
    return res.status(200).json(curtainStatus);
}
export async function curtainControl(req, res){
    const ctrl = req.query.ctrl;
    const onTime = req.query.onTime
    const closeTime = req.query.offTime//커튼 여닫는 시간예약
    if(curtainStatus.ctrl == ctrl){
        return res.status(200).json(curtainStatus)
    }
    curtainStatus.ctrl = ctrl;
    return res.status(200).json(curtainStatus);
}

// == temp == // 
export function tempGetStatus(req, res, next){
    return res.status(200).json(tempStatus);
}
export async function tempControl(req, res){
    const ctrl = req.query.ctrl;
    const onTime = req.query.onTime
    const closeTime = req.query.offTime //켜짐,꺼짐 예약
    console.log(ctrl);
    if(tempGetStatus == ctrl){
        return res.status(200).json(tempStatus)
    }
    //requestApi.post
    statusData.tempStatus = ctrl;
    return res.status(200).json(tempStatus);
}


export async function getStatus(req, res){
    return res.status(200).json(statusData);
}
*/
// test api //


/*
상태 확인(GET)요청
요청형태
http://192.168.0.X/remote/status/lightStatus
*/
export async function testGetStatus(req, res){
    const inst = req.params.inst;
    const uri = 'http://localhost:8080/remote/status/' + inst   //모듈쪽 주소로 변경
    console.log(inst);
    request(uri, function(err, res, body){
        console.log(body);
    })
    res.sendStatus(200);
}

export async function testController(req, res){
    const instId = req.params.inst;
    const ctrl = req.query.ctrl;
    const inst = instStatus.find((inst) => inst.inst === instId);
    
    //inst.ctrl = ctrl;
    
    
    if(await requestModuleControll(inst.inst, inst) == true){
        res.sendStatus(200);
    }else{
        console.error(err);
        res.sendStatus(500);
    }
    
    
    
}


/*
상태 변경(POST)
http://192.168.0.X/remote/controller/lightStatus?ctrl=on&redvalue=200&greenvalue=200&bluevalue=200
*/
async function requestModuleControll(inst, opts){  
    return new Promise(function(resolve, reject){
        const uri = 'http://localhost:8080/remote/controller/' + inst;  //모듈쪽 주소로 변경

    if(inst == 'lightStatus'){
        request.post({
            uri: uri,
            qs:{
                ctrl: opts.ctrl,
                redValue: opts.redValue,
                greenValue: opts.greenValue,
                blueValue: opts.blueValue
            },
        },
        function(error, httpResponse, body){
            if(!error && httpResponse.statusCode == 200){
                resolve(true);
            }else{
                reject(err);
            }
        }
        )
    }
    else if(inst = 'curtainStatus'){
        request.post({
            uri: uri,
            qs:{
                ctrl: opts.ctrl,
                onTime: opts.onTime,
                offTime: opts.offTime
            }
        },
        function(error, httpResponse, body){
            if(!error && httpResponse.statusCode == 200){
                resolve(true);
            }else{
                reject(err);
            }
        })
    }else if(inst == 'tempStatus'){
        request.post({
            uri: uri,
            qs: {
                ctrl: opts.ctrl,
                onTime: opts.onTime,
                offTime: opts.offTime,
                temp: opts.temp
            }
        },function(error, httpResponse, body){
            if(!error && httpResponse.statusCode == 200){
                resolve(true);
            }else{
                reject(err);
            }
        })
    }
    })    
}
import request from 'request';
import instRequest from 'request';

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
        "redValue": "255",
        "greenValue": "255",
        "blueValue": "255"
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

export async function testGetStatus(req, res){
    const inst = req.params.inst;
    console.log(inst);
    res.sendStatus(200);
}

export async function testController(req, res){
    const instId = req.params.inst;
    const ctrl = req.query.ctrl;
    const redValue = req.query.redvalue;
    const inst = instStatus.find((inst) => inst.inst === instId)
    
    inst.ctrl = ctrl;
    inst.redValue = redValue;
    requestModuleControll(inst.inst, inst);
    
}



function requestModuleControll(inst, opts){
    console.log(inst);
    console.log(opts);
    if(inst == 'lightStatus'){
        request.post({
            uri:'localhost:8080/remote/controller',
            method:'POST',
            qs:{
                redValue: opts.redValue,
                greenValue: opts.greenValue,
                blueValue: opts.blueValue
            }
        }, function(err,httpResponse,body){}
        )
    }
    // else if(inst = curtainStatus){
    //     request.post({
    //         uri:'localhost:8080',
    //         method:'POST'
    //     },function(err,httpResponse,body){
    //         console.log(httpResponse);
    //     })
    // }else if(inst == tempStatus){
    //     request.post({
    //         uri:'localhost:8080',
    //         method:'POST'
    //     },function(err,httpResponse,body){
    //         console.log(httpResponse);
    //     })
    // }
    
}
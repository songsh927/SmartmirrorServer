import axios from 'axios';
import 'request-promise-native';
import 'express-async-errors';
import dayjs from 'dayjs';
import request from 'request';
/**
 * 조명 모듈 3
 * 에어컨 모듈 4
 * 커튼 모듈 5
 * ex) 조명모듈 => 192.168.0.3
 */

// == light == //
export async function lightGetStatus(req, res){
    requestModuleGetStatus('3').then(() => {
        res.sendStatus(200);
    })
}

export async function lightControl(req, res){

    const {ctrl, redValue, greenValue, blueValue} = req.body;
    await requestModuleController('3', {ctrl, redValue, greenValue, blueValue}).then(() => {
        res.sendStatus(200);
    })
}


// == curtain== //
export async function curtainGetStatus(req, res){
    requestModuleGetStatus('3').then(() => {
        res.sendStatus(200);
    })
}

export async function curtainControl(req, res){
    const {ctrl, onTime, offTime} = req.body;

    if(onTime !== undefined && offTime != undefined){
        await requestTimeControll('5', onTime, offTime).then(() => {
            res.sendStatus(200);
        })
    }else{
        await requestModuleController('5', {ctrl}).then(() => {
            res.sendStatus(200);
        })
    }

    
}

// == temp == // 
export function tempGetStatus(req, res, next){
    requestModuleGetStatus('4').then(() => {
        res.sendStatus(200);
    })
}

export async function tempControl(req, res){
    const {ctrl, onTime, offTime} = req.body;

    if(onTime !== null && offTime != null){
        await requestTimeControll('4', onTime, offTime).then(() => {
            res.sendStatus(200);
        })
    }else{
        await requestModuleController('4', {ctrl}).then(() => {
            res.sendStatus(200);
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

    // try{
    //     await axios({
    //         method: 'post',
    //         // url:`http://192.168.0.${inst}`,
    //         url: `http://localhost:8080/remote/${inst}`,
    //         headers:{'Content-Type': 'application/json'},
    //         timeout:1000,
    //         data: JSON.stringify(opts)
    //     }).then(() => {
    //         return ;
    //     });
    // }catch(err){
    //     throw err;
    // }


    const options = {
        // uri: `http://192.168.0.${inst}`,
        uri: `http://localhost:8080/remote/${inst}`,
        method: 'POST',
        body: opts,
        json: true
    }

    return await request.post(options, (error, response, body) => {
        if(!error){
            console.log(body);
        }
    })


    
}

async function requestModuleGetStatus(inst){

    return await axios({
        method: 'get',
        url:`http://192.168.0.${inst}`
        // url: `http://localhost:8080/remote/${inst}`
    })

}

async function requestTimeControll(inst,onTime, offTime){
    var sleepUntilonTime = dayjs(dayjs(onTime)).diff(dayjs(), 'ms');
    var sleepTime = dayjs(offTime).diff(dayjs(onTime),'ms');

    return setTimeout(async () => {
        await requestModuleController(inst,{"ctrl": 1}).then((res) =>{
            if(res.status == 200){
                setTimeout(async () => {
                    await requestModuleController(inst,{"ctrl":0}).then((res) => {
                        return res;
                    })
                }, sleepTime)
            }
        });
    }, sleepUntilonTime);
}
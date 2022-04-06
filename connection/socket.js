import pkg from "socket.io";
const Server = pkg;

class Socket {
    constructor(server){
        this.io = new Server(server,{
            cors:{
                origin: '*',
            }
        });

        this.io.on('connection', (socket) => {
        });
    };
};

let socket;

export function initSocket(server){
    if(!socket){
        socket = new Socket(server);
    }
};

export function getSocketIO(){
    if(!socket){
        throw new Error('socket init error');
    }
    return socket.io;
}
import { Manager, Socket } from "socket.io-client"


export const connectToServer = ()=> {

    const manager  = new Manager("http://localhost:3000/socket.io/socket.io.js");

    const socket = manager.socket("/");

    addlisteners(socket);

}

const addlisteners = (socket: Socket) => {
    const serverStatus = document.querySelector<HTMLSpanElement>("#server-status");

    socket.on('connect',()=>{
        serverStatus.innerHTML = "Connected";
    })
    socket.on('disconnect',()=>{
        serverStatus.innerHTML = "Disconnected";
    })
}
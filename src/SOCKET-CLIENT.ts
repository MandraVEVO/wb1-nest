import { Manager, Socket } from "socket.io-client"


export const connectToServer = ()=> {

    const manager  = new Manager("http://localhost:3000/socket.io/socket.io.js");

    const socket = manager.socket("/");

    addlisteners(socket);

}

const addlisteners = (socket: Socket) => {

    const serverStatus = document.querySelector<HTMLSpanElement>("#server-status");
    const clientUl = document.querySelector("#client-ul");

    socket.on('connect',()=>{
        if (serverStatus) {
            serverStatus.innerHTML = "Connected";
        }
    })
    socket.on('disconnect',()=>{
        if (serverStatus) {
            serverStatus.innerHTML = "Disconnected";
        }
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = "";
        clients.forEach(client => {
            clientsHtml += `<li>${client}</li>`;
        });

        if (clientUl) {
            clientUl.innerHTML = clientsHtml;
        }
    })
}
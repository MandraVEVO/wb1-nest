import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string)=> {

    const manager  = new Manager("http://localhost:3000/socket.io/socket.io.js",{
        extraHeaders:{
            hola: "Mundo",
            authentication: token
        }
    });

    socket?.removeAllListeners(); // Remove all previous listeners to avoid duplicates
    socket = manager.socket("/");
    

    addlisteners();

}

const addlisteners = () => {

    const serverStatus = document.querySelector<HTMLSpanElement>("#server-status");
    const clientUl = document.querySelector("#client-ul");

    const messageForm = document.querySelector<HTMLFormElement>("#message-form");
    const messageInput = document.querySelector<HTMLInputElement>("#message-input");
    const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul");

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
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`;
        });

        if (clientUl) {
            clientUl.innerHTML = clientsHtml;
        }
    });

    messageForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    // console.log({id: 'YO!', message: messageInput.value});
    
    socket.emit('message-from-client', {
        id: 'YO!',
        message: messageInput.value
    })
    messageInput.value = "";
    
});

    socket.on('message-from-server',(payload: {fullName: string, message: string}) => {
        const newMessage = `
        
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>
        `;
        const li = document.createElement("li");
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}
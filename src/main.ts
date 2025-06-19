import { connectToServer } from './SOCKET-CLIENT'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>

   <input id="jwtToken" placeholder="Json Web Token"/>
   <button id="btn-connect">Connect</button>

   <br />
   <span id="server-status">Offline</span>

  <ul id="client-ul"></ul>

  <form id="message-form">
  <input placeholder = "message" id="message-input" />
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>

  </div>
`

// connectToServer();
const inputJwt = document.querySelector<HTMLInputElement>("#jwtToken")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {

  if(inputJwt.value.trim().length <= 0) return alert("JWT Token is required");
  connectToServer(inputJwt.value.trim());
});

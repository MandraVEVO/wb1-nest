import { connectToServer } from './SOCKET-CLIENT'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>

   <span id="server-status">Offline</span>

  <ul id="client-ul">
  <li>HOLA PAPU</li>
  </ul>


  </div>
`
connectToServer();


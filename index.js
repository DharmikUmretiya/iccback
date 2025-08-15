const WebSocket = require('ws');
const http = require('http');


const server = http.createServer();
const wss = new WebSocket.Server({ server, path: '/ws' });


wss.on('connection', function connection(clientWs, req) {
  
  const espWs = new WebSocket("ws://192.168.4.1/ws");

  espWs.on('open', () => console.log('Connected to ESP32'));
  espWs.on('message', (msg) => clientWs.send(msg));   // ESP32 -> Frontend
  clientWs.on('message', (msg) => espWs.send(msg));   // Frontend -> ESP32
});

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

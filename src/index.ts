const express = require('express');
const http = require('http');
const cors = require('cors');
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io: Server = new Server(server);

app.get('/', (req: any, res: any) => {
	res.send('Hello World');
});

app.get('/api', (req: any, res: any) => {
	console.log('this ran');
	io.emit('api', 'It works!!!');
	res.send('good job');
});

io.on('connection', (socket: any) => {
	console.log(`a user connected: ${socket.id}`);
});

server.listen(PORT, () => {
	console.log('listening on PORT: 3000');
});

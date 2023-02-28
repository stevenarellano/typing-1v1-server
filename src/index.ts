const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
import { Server } from 'socket.io';
import { connectController } from './api';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io: Server = new Server(server);

app.get('/', (req: any, res: any) => {
	res.send('Hello World');
});

app.post('/connect', (req: any, res: any) => {
	connectController(req, res);
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

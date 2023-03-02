"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectController = void 0;
const context_1 = require("../../context");
const utils_1 = require("../../utils");
let visitNumberInSecond = 1;
let lastAccess = new Date().getSeconds();
function connectController(req, res) {
    const date = new Date();
    visitNumberInSecond = (0, utils_1.getVisitNumberInSecond)(date, lastAccess);
    lastAccess = date.getSeconds();
    const { password } = req.body;
    const player = (0, utils_1.getPlayer)(password);
    if (player === 0 && !context_1.GAME.players[0].connected) {
        context_1.GAME.playersConnected++;
        context_1.GAME.players[0].connected = true;
    }
    if (player === 1 && !context_1.GAME.players[1].connected) {
        context_1.GAME.playersConnected++;
        context_1.GAME.players[1].connected = true;
    }
    if (context_1.GAME.playersConnected === 2 && player !== -1) {
        if ((visitNumberInSecond === 1 && context_1.GAME.promptsSent === 0) ||
            (visitNumberInSecond === 2 && context_1.GAME.promptsSent === 1)) {
            const connectResponse = (0, utils_1.createConnectResponse)(true, context_1.GAME.prompt, player);
            res.send(connectResponse);
            context_1.GAME.promptsSent++;
        }
        else {
            const connectResponse = (0, utils_1.createConnectResponse)(false, 'All players connected. Please wait to start.');
            res.send(connectResponse);
        }
    }
    else {
        const connectResposne = (0, utils_1.createConnectResponse)(false, 'Waiting for other player to connect.');
        res.send(connectResposne);
    }
}
exports.connectController = connectController;

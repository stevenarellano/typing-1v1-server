"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayer = void 0;
const context_1 = require("../context");
function getPlayer(password) {
    if (password === context_1.GAME.players[0].password) {
        return 0;
    }
    else if (password === context_1.GAME.players[1].password) {
        return 1;
    }
    else {
        return -1;
    }
}
exports.getPlayer = getPlayer;

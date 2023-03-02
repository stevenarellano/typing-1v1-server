"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameInstance = exports.resetGame = exports.NEW_GAME = exports.GAME = void 0;
const prompts_1 = require("./prompts");
let GAME = {
    playersConnected: 0,
    prompt: 'all I want for christmas is you',
    players: [
        { password: 'asdf', connected: false },
        { password: '1234', connected: false },
    ],
    promptsSent: 0,
    winnerDeclared: false,
};
exports.GAME = GAME;
const NEW_GAME = {
    playersConnected: 0,
    prompt: 'all I want for christmas is you',
    players: [
        { password: 'asdf', connected: false },
        { password: '1234', connected: false },
    ],
    promptsSent: 0,
    winnerDeclared: false,
};
exports.NEW_GAME = NEW_GAME;
function createGameInstance(player1, player2) {
    return {
        playersConnected: 0,
        prompt: (0, prompts_1.getRandomPrompt)(),
        players: [
            { password: player1, connected: false },
            { password: player2, connected: false },
        ],
        promptsSent: 0,
        winnerDeclared: false,
    };
}
exports.createGameInstance = createGameInstance;
function resetGame(player1, player2) {
    exports.GAME = GAME = createGameInstance(player1, player2);
}
exports.resetGame = resetGame;

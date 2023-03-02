"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPrompt = exports.PROMPTS = void 0;
const PROMPTS = [
    "I'm findin' ways to articulate the feelin' I'm goin' through",
    "You know what I'm thinkin', see it in your eyes",
    'You hate that you want me, hate it when you cry',
];
exports.PROMPTS = PROMPTS;
function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * PROMPTS.length);
    return PROMPTS[randomIndex];
}
exports.getRandomPrompt = getRandomPrompt;

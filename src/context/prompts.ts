const PROMPTS = [
	"I'm findin' ways to articulate the feelin' I'm goin' through",
	"You know what I'm thinkin', see it in your eyes",
	'You hate that you want me, hate it when you cry',
];

function getRandomPrompt(): string {
	const randomIndex = Math.floor(Math.random() * PROMPTS.length);
	return PROMPTS[randomIndex];
}

export { PROMPTS, getRandomPrompt };

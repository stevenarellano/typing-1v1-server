const PROMPTS = [
	'What transforms this world is — knowledge. Do you see what I mean? Nothing else can change anything in this world.',
	'Knowledge alone is capable of transforming the world, while at the same time leaving it exactly as it is.',
	'When you look at the world with knowledge, you realize that things are unchangeable and at the same time are constantly being transformed.',
];

function getRandomPrompt(): string {
	const randomIndex = Math.floor(Math.random() * PROMPTS.length);
	return PROMPTS[randomIndex];
}

export { PROMPTS, getRandomPrompt };

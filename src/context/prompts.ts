const PROMPTS = [
	"I wanna be the very best. Like no one ever was. To catch them is my real test. To train them is my cause. I will travel across the land. Searching far and wide. Teach Pokémon to understand. The power that's inside",
	"I don't want a lot for Christmas. There is just one thing I need. I don't care about the presents underneath the Christmas tree. I just want you for my own. More than you could ever know. Make my wish come true. All I want for Christmas is you",
	'When you look at the world with knowledge, you realize that things are unchangeable and at the same time are constantly being transformed.',
	"I'ma get a scholarship to King's College. I probably shouldn't brag, but dang, I amaze and astonish. The problem is I got a lot of brains but no polish",
];

function getRandomPrompt(): string {
	const randomIndex = Math.floor(Math.random() * PROMPTS.length);
	return PROMPTS[randomIndex];
}

export { PROMPTS, getRandomPrompt };

# discord-mathletics-bot
A simple bot to play Mathletics on a Discord server.

## About
This is a simple Mathletics bot that lets you enjoy the good ol' days of Mathletics with your friends on Discord.

Whoever types the answer to the question fastest will be awarded one point, with the leaderboard displayed at the end. 

Currently incorect answers will deduct a single point to avoid spamming multiple solutions.

## Installation & Quick Start
To start the bot, first install dependencies:
```
yarn
```
You will then need to create a `.env` file and place the Discord App token as 
```
DISCORD_TOKEN = '<YOUR-TOKEN>'
```

To start the instance:
```
yarn start
```

## Usage
To start a Mathletics game you can give it several parameters.

Currently, the operations supported are:
- `+` Addition
- `-` Subtraction
- `*` Multiplication (up until 12 x 12)
- `/` Division (up until 144 / 12)
- `%` Modulo
- `//` Integer Division

To begin a Mathletics game you can send the following command in the chat:
```
$mathletics [force] <no. questions> <operations>
```
Where `operations` can be a space separated list of any of the above supported operations.

Use `force` to force restart a game if there is currently one in progress.

As an example, the following command will start a Mathletics game with 20 questions with both addition and subtraction questions chosen at random:
```
$mathletics 20 + -
```

## File Structure
The main mathletics logic can be found in `services/mathletics.js` where you can add additional operations and functionality.

To update how the scoring works (or disable the deduction of points), update the game master logic in `services/gamemaster.js`.

Discord related operations are found in `main.js`.

Play around with the embeds and what's displayed in the `embeds/` subdirectory.

Enjoy!

class Perso {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.attack = 50;
    this.defense = 25;
  }

  strike(opponent) {
    const blow = Math.round(this.attack * randomize());

    if (blow <= opponent.defense) {
      opponent.health -= 0;
      displayMessage(`${opponent.name} dodged ${this.name} attack !`);
    } else {
      opponent.health -= blow - opponent.defense;
      displayMessage(
        `${this.name} inflicted ${blow - opponent.defense} damage on ${
          opponent.name
        }`
      );
    }
  }
}

const names = [
  "Thanos",
  "Skilled Hammer",
  "Deranged Robin",
  "Ancient Slayer",
  "Doctor Milipede",
  "Hollow Devil",
  "Tecton"
];

// DOM elements
const setup = document.getElementById("setup");
const fightStats = document.getElementById("fight-stats");
const fightTitle = document.getElementById("fight-title");
const heroName = document.getElementById("hero");
const playerName = document.getElementById("player-name");
const playerHealth = document.getElementById("player-health");
const pnjName = document.getElementById("pnj-name");
const pnjHealth = document.getElementById("pnj-health");
const messageContainer = document.getElementById("message");
const startGame = document.getElementById("hero-btn");
const attackButton = document.getElementById("attack-btn");

let player, pnj;

// game logic
const displayInfoPlayers = (player, pnj) => {
  playerName.innerHTML = player.name;
  pnjName.innerHTML = pnj.name;
  fightTitle.innerHTML = `${player.name} VS ${pnj.name}`;
};

const displayHealthPlayers = (player, pnj) => {
  playerHealth.innerHTML = player.health;
  pnjHealth.innerHTML = pnj.health;
};

const displayMessage = message => {
  messageContainer.innerHTML = message;
};

const randomize = () => {
  return Math.random().toFixed(2); // generate a random number with 2 decimals
};

const createPlayer = name => {
  return new Perso(name); // instantiate player
};

const getWinner = () => {
  if (player.health < 1) {
    return pnj.name;
  }
  if (pnj.health < 1) {
    return player.name;
  }
};

const initGame = () => {
  player = createPlayer(heroName.value);
  pnj = new Perso(names[Math.round(Math.random() * names.length)]);
  setup.classList.toggle("hide");
  fightStats.classList.toggle("display");
  displayInfoPlayers(player, pnj);
  displayHealthPlayers(player, pnj);
};

const playRound = () => {
  const winner = getWinner();
  if (winner) {
    attackButton.disabled = true;
    displayMessage(`${winner} crushed his opponent !`);
    return;
  }
  player.strike(pnj);
  displayHealthPlayers(player, pnj);
  setTimeout(() => {
    pnj.strike(player);
    displayHealthPlayers(player, pnj);
  }, 1500);
};

startGame.addEventListener("click", initGame);
attackButton.addEventListener("click", playRound);

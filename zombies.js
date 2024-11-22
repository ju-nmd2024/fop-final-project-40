// Zombies spawning on random position from canvas width & height
// Zombies moving towards the players movement
// they have a slight repel so that they do not stack up
// unless the player stays still

// there is no collision
// either we have zombies spawning overtime
// or having one spawn when another one dies, (this i have not done)

let zombies = [];
let player;
let screenWidth = 400;
let screenHeight = 400;
let spawnRate = 50; // Spawns a new zombie
let lastSpawnTime = 0; // Tracks when the last zombie spawned
let maxZombieCount = 20; // max zombies on screen

function setup() {
  createCanvas(screenWidth, screenHeight);
  //player variables and center start position
  player = {
    x: screenWidth / 2,
    y: screenHeight / 2,
    size: 25,
  };

  // zombies at random positions and amount of zombie spawn
  for (let i = 0; i < 10; i++) {
    zombies.push(createZombie());
  }
}
// could probably be turned into a "class zombie" instead
function createZombie() {
  return {
    //zombie variables
    x: random(screenWidth),
    y: random(screenHeight),
    size: 20,
    speed: 1 + random(0.5), // randomized zombie speed after spawn
  };
}

function draw() {
  background(255);

  //player
  fill(0);
  ellipse(player.x, player.y, player.size);

  // zombies movement
  for (let i = 0; i < zombies.length; i++) {
    let zombie = zombies[i];
    //zombie move toward player
    let dx = player.x - zombie.x;
    let dy = player.y - zombie.y;
    let angle = atan2(dy, dx);

    zombie.x += cos(angle) * zombie.speed;
    zombie.y += sin(angle) * zombie.speed;

    // to make sure the zombies do not stack up if player moves
    // creating a repel system
    for (let j = 0; j < zombies.length; j++) {
      if (i !== j) {
        let other = zombies[j];
        let distance = dist(zombie.x, zombie.y, other.x, other.y);

        if (distance < zombie.size) {
          let repelAngle = atan2(zombie.y - other.y, zombie.x - other.x);
          zombie.x += cos(repelAngle) * 0.5; // the amount of repelling (x)
          zombie.y += sin(repelAngle) * 0.5; // the amount of repelling (y)
        }
      }
    }
    // zombie
    fill(0, 255, 0);
    ellipse(zombie.x, zombie.y, zombie.size);
  }

  // player movement
  if (keyIsDown(87)) {
    player.y -= 3; // W
  }
  if (keyIsDown(65)) {
    player.x -= 3; // A
  }
  if (keyIsDown(83)) {
    player.y += 3; // S
  }
  if (keyIsDown(68)) {
    player.x += 3; // D
  }

  // Spawn a new zombie every few seconds until max number
  if (
    frameCount - lastSpawnTime > spawnRate &&
    zombies.length <= maxZombieCount
  ) {
    zombies.push(createZombie());
    lastSpawnTime = frameCount; // Update last spawn time
  }
}

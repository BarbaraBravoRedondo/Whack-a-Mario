const pipe = document.querySelectorAll('.pipe');
const scoreBoard = document.querySelector('.score');
const mario = document.querySelectorAll('.mario');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(pipe) {
    const idx = Math.floor(Math.random() * pipe.length);
    const hole = pipe[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(pipe);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1500);
    const hole = randomHole(pipe);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 25000)
}

function whackIt(e) {
     if (!e.isTrusted) return; 
    if (e.type !== 'click') return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

mario.forEach(mole => 
    mole.addEventListener('click', whackIt));
    mole.addEventListener('touchstart', whackIt);

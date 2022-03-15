import * as sorting from './sorting-algorithms.js'

const ARRAY_SIZE = 10;

function genArray() {
    let barsData = [];
    let min = 10;
    let max = window.innerHeight - 250;
    const barWidth = Math.min((window.innerWidth-250)/ARRAY_SIZE, 50);

    for (let i = 0; i < ARRAY_SIZE; i++) barsData.push(Math.floor(Math.random() * (max-min) + min));

    return barsData.map((bar) => `<div class="bar" style="height: ${bar}px; width: ${barWidth}px"></div>`).join('');
}

document.querySelector('.wrapper__animation').innerHTML = genArray();
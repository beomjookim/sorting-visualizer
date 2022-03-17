import * as sorting from './sorting-algorithms.js'

const barsElement = document.querySelector('.ani__animation');
const genBtn = document.querySelector('.nav__gen-btn');
const toggleBtn = document.querySelector('.nav__ctrl-toggle-btn');
const stopBtn = document.querySelector('.nav__ctrl-stop-btn');
const arrSizeSliderElement = document.querySelector('.nav__num-label');
const aniSpeedSliderElement = document.querySelector('.nav__speed-label');
const aniSliderElement = document.querySelector('.ani__slider');
const enableNumSlider = document.querySelector('.nav__num-slider');
const sortingAlgorithms = document.querySelector('.nav__algo-slt');

let ARRAY_SIZE = 30;
let ANIMATION_TIME = 10; // 최소 5 최대 100
const BAR_WIDTH = Math.min((window.innerWidth-250)/ARRAY_SIZE, 50);

let isPlaying = false;
let isSorted = false;

let barsData;
let animationFrames;
let interval;

function genArray() {
    barsData = [];
    const min = 10;
    const max = window.innerHeight - 300;

    for (let i = 0; i < ARRAY_SIZE; i++) barsData.push(Math.floor(Math.random() * (max-min) + min));

    isSorted = false;
    render(barsData);
    enableSizeControl();
    setSlider(0);
}

genArray(); // 화면 처음 틀었을 때 새로운 어레이 렌더링

// # of Bars 컨트롤 시 새로운 어레이 렌더링
arrSizeSliderElement.addEventListener('input', e => {
    if (!parseInt(aniSliderElement.value)){
        ARRAY_SIZE = e.target.value;
        genArray();
    }
    // 배열이 초기화된 상태가 아니면 안 움직이게!
})

// speed 컨트롤 시 해당 값 적용
aniSpeedSliderElement.addEventListener('input', e => {
    ANIMATION_TIME = 500/e.target.value;
    if (isPlaying) {
        pauseAnimation();
        runAnimation();
    }
})

aniSliderElement.addEventListener('input', e => {
    if (!isSorted) sort(barsData);
    if (isPlaying) pauseAnimation();
    render(animationFrames[e.target.value].arr)
})

// sorting 시전: unsorted array 받아서 sorting 하면서 그 과정을 장면 별로 받음.
function sort(barsData){
    const result = sorting[sortingAlgorithms.value](barsData);
    isSorted = true;
    animationFrames = result.animationFrames;
    aniSliderElement.setAttribute('max', animationFrames.length-1);
};

function runAnimation(){
    isPlaying = true;
    toggleBtn.setAttribute('class', 'mdi mdi-pause nav__ctrl-toggle-btn');
    toggleBtn.innerHTML = ' PAUSE';
    disableSizeControl();

    let cur = aniSliderElement.value;
    interval = setInterval(() => {
        cur++;
        render(animationFrames[cur].arr)
        setSlider(cur);
    }, ANIMATION_TIME)
}

function pauseAnimation(){
    isPlaying = false;
    toggleBtn.setAttribute('class', 'mdi mdi-play nav__ctrl-toggle-btn');
    toggleBtn.innerHTML = ' PLAY';

    clearInterval(interval);
}

function stopAnimation(){
    if (interval) pauseAnimation();
    setSlider(0);
    enableSizeControl();
    render(animationFrames[0].arr);
    interval = null;
}

function setSlider(pos){
    if (animationFrames && pos === animationFrames.length-1) {
        toggler();
        aniSliderElement.value = pos+1;
        return;
    }

    aniSliderElement.value = pos;
}

function render(bars){
    barsElement.innerHTML = bars.map((bar) => `<div class="bar" style="height: ${bar}px; width: ${BAR_WIDTH}px"></div>`).join('');
}

function toggler(){
    if (isPlaying) pauseAnimation();
    else {
        if (!isSorted) sort(barsData); // 맨 처음 한번만 시뮬레이션
        runAnimation();
    }
}

function disableSizeControl(){
    enableNumSlider.setAttribute('disabled', '')
}

function enableSizeControl(){
    enableNumSlider.removeAttribute('disabled');
}

genBtn.onclick = genArray; // Generate Bars 눌렀을 때 새로운 어레이 렌더링
toggleBtn.onclick = toggler; // toggle 버튼 눌렀을 때 버튼 class name 바꾸고 실행 혹은 일시 정지
stopBtn.onclick = stopAnimation; // 정지 버튼 눌렀을 때 진행상황 초기화 및 화면 렌더링
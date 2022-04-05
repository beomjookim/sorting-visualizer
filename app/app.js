import * as sorting from './sorting-algorithms.js'

const [barsElement, sortingAlgorithms, genBtn, toggleBtn, stopBtn, arrSizeSlider, aniSpeedSlider, aniSlider] = ['.ani__animation', '.nav__algo-slt', '.nav__gen-btn', '.nav__ctrl-toggle-btn', '.nav__ctrl-stop-btn', '.nav__num-label', '.nav__speed-label', '.ani__slider'].map(e => document.querySelector(e));

let ARRAY_SIZE = 30;
let ANIMATION_TIME = 10; // 최소 5 최대 100
const BAR_WIDTH = Math.min((window.innerWidth-250)/ARRAY_SIZE, 50);

let isPlaying = false;
let isSorted = false;

let barsData;
let animationFrames;
let renderFrame;
let interval;

function genArray() {
    const minSize = 10;
    const maxSize = window.innerHeight - 300;
    barsData = Array.from({length: ARRAY_SIZE}, () => Math.floor(Math.random() * (maxSize-minSize) + minSize));

    isSorted = false;
    barsElement.innerHTML = barsData.map((height) => `<div class="bar" style="height: ${height}px; width: ${BAR_WIDTH}px"></div>`).join('');

    enableSizeControl();
    setSlider(0);
}

// sorting 시전: unsorted array 받아서 sorting 하면서 그 과정을 장면 별로 받음.
function sort(barsData){
    let results = sorting[sortingAlgorithms.value](barsData);
    animationFrames = results.animationFrames;
    renderFrame = results.renderFrame;
    isSorted = true;
    aniSlider.setAttribute('max', animationFrames.length-1);
};

function playAnimation(){
    isPlaying = true;
    toggleBtn.setAttribute('class', 'mdi mdi-pause nav__ctrl-toggle-btn');
    toggleBtn.innerHTML = ' PAUSE';
    disableSizeControl();

    let cur = aniSlider.value == animationFrames.length-1? 0 : aniSlider.value;
    // 만약 애니메이션이 완료된 상태에서 플레이 버튼이 눌리면 다시 처음부터 리플레이.
    interval = setInterval(() => {
        cur++;
        renderBars(cur);
        setSlider(cur);
    }, ANIMATION_TIME);
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
    renderBars(0);
    interval = null;
}

function setSlider(index){
    if (animationFrames && index === animationFrames.length-1) {
        playOrPause();
        aniSlider.value = index+1;
        return;
    }

    aniSlider.value = index;
}

function renderBars(frameIndex){
    barsElement.innerHTML = renderFrame(frameIndex, BAR_WIDTH);
}

function playOrPause(){
    if (isPlaying) pauseAnimation();
    else {
        if (!isSorted) sort(barsData); // 맨 처음 한번만 시뮬레이션
        playAnimation();
    }
}

function disableSizeControl(){
    arrSizeSlider.querySelector('input').setAttribute('disabled', '')
}

function enableSizeControl(){
    arrSizeSlider.querySelector('input').removeAttribute('disabled');
}

genArray(); // 화면 처음 틀었을 때 새로운 어레이 렌더링

// # of Bars 컨트롤 시 새로운 어레이 렌더링
arrSizeSlider.addEventListener('input', e => {
    if (!parseInt(aniSlider.value)){
        ARRAY_SIZE = e.target.value;
        genArray();
    }
    // 배열이 초기화된 상태가 아니면 안 움직이게!
})

// speed 컨트롤 시 해당 값 적용
aniSpeedSlider.addEventListener('input', e => {
    ANIMATION_TIME = 500/e.target.value;
    if (isPlaying) {
        pauseAnimation();
        playAnimation();
    }
})

aniSlider.addEventListener('input', e => {
    if (!isSorted) sort(barsData);
    if (isPlaying) pauseAnimation();
    renderBars(parseInt(e.target.value));
})

genBtn.onclick = genArray;       // Generate Bars 눌렀을 때 새로운 어레이 렌더링
toggleBtn.onclick = playOrPause; // toggle 버튼 눌렀을 때 버튼 class name 바꾸고 실행 혹은 일시 정지
stopBtn.onclick = stopAnimation; // 정지 버튼 눌렀을 때 진행상황 초기화 및 화면 렌더링
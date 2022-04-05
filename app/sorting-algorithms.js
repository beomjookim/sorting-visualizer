export function mergeSort(barsData) {
    let animationFrames = [];
    let dataLength = barsData.length-1;
    let sorted = [];

    function addFrame({compare = []}) {
        animationFrames.push({
            arr: [...barsData],
            compare,
            sorted: [...sorted]
        });
    }

    function mergeSort(arr, start, end) {
        if (start < end) {
            let mid = parseInt((start + end) / 2);
            mergeSort(arr, start, mid);
            mergeSort(arr, mid + 1, end);
            merge({arr, start, mid, end});
        }
    }

    function merge({arr, start, mid, end}) {
        let arr2 = [...arr];
        let [i, j, k] = [start, mid + 1, start];

        while (i <= mid && j <= end) {
            addFrame({compare: [j,k]});
            if (!start && end === dataLength) sorted.push(k);
            if (arr2[i] <= arr2[j]) {
                arr[k++] = arr2[i++];
            }
            else {
                arr.splice(j, 1);
                arr.splice(k++, 0, arr2[j++]);
            }
            addFrame({compare: [j,k]});
        }

        while (i <= mid) {
            if (!start && end === dataLength) sorted.push(k);
            addFrame({compare: [j,k]});
            arr[k++] = arr2[i++];
        }

        while (j <= end) {
            if (!start && end === dataLength) sorted.push(k);
            addFrame({compare: [j,k]});
            arr.splice(j, 1);
            arr.splice(k++, 0, arr2[j++]);
        }
    }

    addFrame({})
    mergeSort(barsData, 0, dataLength);
    addFrame({})

    return {
        animationFrames,
        renderFrame: (frameIndex, width) => {
            let frame = animationFrames[frameIndex];
            let {compare, sorted} = frame;
            return frame.arr.map((height, index) => `<div class="bar${compare.includes(index) ? ' comparing' : ''}${sorted.includes(index) ? ' sorted' : ''}" style="height: ${height}px; width: ${width}px"></div>`).join("");
        }
    };
}

export function quickSort(barsData) {
    let animationFrames = [];
    let sorted = [];

    function addFrame({compare = [], pivot}) {
        animationFrames.push({
            arr: [...barsData],
            compare,
            pivot,
            sorted: [...sorted]
        })
    }

    function swap(i, j) {
        [barsData[i], barsData[j]] = [barsData[j], barsData[i]];
    }

    function partition(low, high) {
        let pivot = barsData[high]; // 어차피 랜덤이므로 맨 뒤에 있는 친구를 pivot으로 선정!
        let i = low - 1;
        const frame = {pivot: high};

        addFrame(frame);
        let j = low;
        for (; j < high; j++) {
            if (barsData[j] <= pivot) {
                addFrame({ ...frame, compare: [i, j]});
                i++;
                addFrame({ ...frame, compare: [i, j]});
                swap(i, j);
            }
            addFrame({ ...frame, compare: [i, j]});
        }
        addFrame({ ...frame, compare: [i, j]});
        swap(i + 1, high);
        addFrame({pivot: i + 1, compare: [i, j]});
        return i + 1;
    }

    function quickSort(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            sorted.push(pi);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } 
        else sorted.push(low, high);
    }

    addFrame({});
    quickSort(0, barsData.length - 1);
    addFrame({});

    return {
        animationFrames,
        renderFrame: (frameIndex, width) => {
            let frame = animationFrames[frameIndex];
            let {compare, pivot, sorted} = frame;
            return frame.arr.map((bar, index) => `<div class="bar${compare.includes(index) ? ' comparing' : ''}${sorted.includes(index) ? ' sorted' : ''}${pivot == index ? ' pivot' : ''}" style="height: ${bar}px; width: ${width}px"></div>`).join("");
        }
    };
}

export function insertionSort(barsData) {
    let animationFrames = [];
    let sortedBarsData = [];

    function addFrame({compare = []}) {
        animationFrames.push({
            arr: [...barsData, ...sortedBarsData],
            compare
        });
    }

    while (barsData.length){
        const temp = barsData[0];
        let comparedTo = 0;
        let flag = true;
        while (comparedTo < sortedBarsData.length){
            addFrame({compare: [0, barsData.length + comparedTo]});
            if (temp <= sortedBarsData[comparedTo]){
                barsData.shift();
                sortedBarsData.splice(comparedTo, 0, temp);
                flag = false;
                break;
            }
            else comparedTo++;
        }
        if (flag) sortedBarsData.push(barsData.shift());
        addFrame({});
    }

    return {
        animationFrames,
        renderFrame: (frameIndex, width) => {
            let frame = animationFrames[frameIndex];
            let {compare} = frame;
            return frame.arr.map((height, index) => `<div class="bar${compare.includes(index) ? ' comparing' : ''}${frameIndex == animationFrames.length-1 ? ' sorted' : ''}" style="height: ${height}px; width: ${width}px"></div>`).join("");
        }
    };
}

export function selectionSort(barsData) {
    let animationFrames = [];
    let sortedBarsData = [];
    let sortedInd = barsData.length;

    function addFrame({compare = []}) {
        animationFrames.push({
            arr: [...barsData, ...sortedBarsData],
            compare,
            sortedInd: sortedInd
        });
    }

    addFrame({});

    while (barsData.length) {
        let minIndex = barsData.reduce((minIndex, cur, ind) => {
            addFrame({compare: [minIndex, ind]});
            return barsData[minIndex] >= cur ? ind : minIndex}, 0);
        sortedBarsData.push(barsData[minIndex]);
        barsData.splice(minIndex, 1);
        sortedInd--;
        addFrame({});
    }

    return {
        animationFrames,
        renderFrame: (frameIndex, width) => {
            let frame = animationFrames[frameIndex];
            let {compare, sortedInd} = frame;
            return frame.arr.map((height, index) => `<div class="bar${compare.includes(index) ? ' comparing' : ''}${index >= sortedInd ? ' sorted' : ''}" style="height: ${height}px; width: ${width}px"></div>`).join("");
        }
    };
}

export function bubbleSort(barsData) {
    let animationFrames = [];
    let sortedInd = barsData.length;

    function addFrame({compare = []}) {
        animationFrames.push({
            arr : [...barsData],
            compare,
            sortedInd: sortedInd
        });
    }

    function swap(i, j) {
        [barsData[i], barsData[j]] = [barsData[j], barsData[i]];
    }

    addFrame({});

    while (sortedInd){
        for (let i = 0; i < sortedInd-1; i++){
            addFrame({compare: [i, i+1]});
            if (barsData[i] > barsData[i+1]) swap(i, i+1);
        }
        sortedInd--;
        addFrame({});
    }
    
    return {
        animationFrames,
        renderFrame: (frameIndex, width) => {
            let frame = animationFrames[frameIndex];
            let {compare, sortedInd} = frame;
            return frame.arr.map((height, index) => `<div class="bar${compare.includes(index) ? ' comparing' : ''}${index >= sortedInd ? ' sorted' : ''}" style="height: ${height}px; width: ${width}px"></div>`).join("");
        }
    };
}
export function mergeSort(barsData) {
    var animationFrames = [];
    var sorted = [];
    function addFrame({ compare = [], orderedIndex, start, mid, end }) {
        animationFrames.push({
            arr: barsData.slice(0),
            compare,
            orderedIndex,
            start,
            mid,
            end,
        })
    }

    function mergeSort(arr, start, end) {
        if (start < end) {
            let mid = parseInt((start + end) / 2);
            mergeSort(arr, start, mid)
            mergeSort(arr, mid + 1, end)
            merge(arr, start, mid, end)
        }
    }

    function merge(arr, start, mid, end) {
        let arr2 = arr.slice(0);
        let i = start, j = mid + 1;
        let k = start;
        while (i <= mid && j <= end) {
            addFrame({ compare: [k, j], start, mid, end })
            if (arr2[i] <= arr2[j]) {
                addFrame({ compare: [k, j], orderedIndex: k, start, mid, end })
                arr[k++] = arr2[i++]
            }
            else {
                addFrame({ compare: [k, j], orderedIndex: j, start, mid, end })
                arr.splice(j, 1)
                arr.splice(k++, 0, arr2[j++])
            }
        }

        while (i <= mid) {
            addFrame({ compare: [k, j], start, mid, end })
            arr[k++] = arr2[i++]
        }

        while (j <= end) {
            addFrame({ compare: [k, j], start, mid, end })
            arr.splice(j, 1)
            arr.splice(k++, 0, arr2[j++])
        }
    }

    addFrame({})
    mergeSort(barsData, 0, barsData.length - 1)
    addFrame({ start: 0, mid: (barsData.length - 1) / 2, end: barsData.length - 1 })

    return {
        animationFrames,
        renderBars: (frameIndex) => {
            let frame = animationFrames[frameIndex];
            return frame.arr.map((bar, index) => {
                let { arr, compare = [], orderedIndex, start, mid, end } = frame
                return `
            <div class="bar ${compare.includes(index) ? 'comparing' : ''} ${(start == 0 && end == arr.length - 1) && (compare[0] == undefined || index < compare[0]) ? 'sorted' : ''} ${orderedIndex == index ? 'ordered' : ''} ${start == index ? 'start' : ''} ${end == index ? 'end' : ''} ${mid == index ? 'mid' : ''} " style="height: ${bar}px; "></div>
        `}).join("")
        }
    };
}
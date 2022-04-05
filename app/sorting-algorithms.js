export function mergeSort(barsData) {
    let animationFrames = [];
    let dataLength = barsData.length-1;

    function addFrame({ compare = [], start, mid, end }) {
        animationFrames.push({
            arr: [...barsData],
            compare,
            start,
            mid,
            end,
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
        const frame = { start, mid, end };

        while (i <= mid && j <= end) {
            addFrame({...frame, compare: [j,k]});
            if (arr2[i] <= arr2[j]) {
                arr[k++] = arr2[i++];
            }
            else {
                arr.splice(j, 1);
                arr.splice(k++, 0, arr2[j++]);
            }
            addFrame({...frame, compare: [j,k]});
        }

        while (i <= mid) {
            addFrame({...frame, compare: [j,k]});
            arr[k++] = arr2[i++];
        }

        while (j <= end) {
            addFrame({...frame, compare: [j,k]});
            arr.splice(j, 1);
            arr.splice(k++, 0, arr2[j++]);
        }
    }

    addFrame({})
    mergeSort(barsData, 0, dataLength);
    addFrame({ start: 0, mid: (barsData.length - 1) / 2, end: barsData.length - 1 })

    return animationFrames;
}
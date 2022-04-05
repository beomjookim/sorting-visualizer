let barsData = [5,2,3,5,6,7,4,2,3]
console.log(barsData.reduce((minIndex, cur, ind) => barsData[minIndex] >= cur ? ind : minIndex, 0));
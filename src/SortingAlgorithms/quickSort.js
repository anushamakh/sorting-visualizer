export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx){
    let pi= partition(mainArray, startIdx,endIdx, animations);
    quickSortHelper(mainArray, startIdx, pi-1, animations);
    quickSortHelper(mainArray, pi +1, endIdx, animations);}
}

function partition(mainArray, startIdx, endIdx, animations){
    let pivot= mainArray[endIdx];
    let i= startIdx;
    for(let j = startIdx; j< endIdx; j++){
        animations.push([j, endIdx]);
        animations.push([j, endIdx]);
        if(mainArray[j]<pivot){
            [mainArray[i],mainArray[j]]=[mainArray[j],mainArray[i]];
            animations.push([j,mainArray[j]]);
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i,mainArray[i]]);
            i++;
        }
        else{
            animations.push([j,mainArray[j]]);
            animations.push([i, j]);
            animations.push([i, j]);
            animations.push([i,mainArray[i]]);    
        }
    }
    animations.push([i,endIdx]);
    animations.push([i,endIdx]);
    [mainArray[i],mainArray[endIdx]]=[mainArray[endIdx],mainArray[i]];
    animations.push([endIdx,mainArray[endIdx]]);
    animations.push([i, endIdx]);
    animations.push([i, endIdx]);
    animations.push([i,mainArray[i]]);
    

    return i;

}
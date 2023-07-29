export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, array.length, animations );
    return animations;
}
function bubbleSortHelper(mainArray, n, animations ){
    var i,j , temp;
    var swapped;
    for (i=0; i<n-1; i++){
        swapped = false;

        for (j=0; j<n-i-1; j++){ //0,1,2
            animations.push([j, (j+1)]);//([0,1],[1,2],[2,3])
            animations.push([j, (j+1)]);//([0,1],[1,2],[2,3])
            if (mainArray[j] > mainArray[j+1])
            {
                //swap jth and (j+1)th element
                temp = mainArray[j];//temp=8
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
                animations.push([j, mainArray[j]]);
                swapped = true;
            }
            else{
                animations.push([j, mainArray[j]]);//([0,1],[1,7])
            }
        }
        animations.push([(n-1-i),(n-1-i)]);
        animations.push([(n-1-i),(n-1-i)]);
        animations.push([(n-1-i),mainArray[n-1-i]]);
        
        //if no two elements were swapped by inner loop, then break
        if (swapped == false)
        break;
    }
} 
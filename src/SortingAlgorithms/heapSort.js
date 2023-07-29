export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
  }
  function heapSortHelper( mainArray,animations)
  {
    let N = mainArray.length ;
      // Build heap (rearrange array)
      for (var i = Math.floor(N / 2)-1; i >= 0; i--)
          heapify(mainArray, N, i, animations);

      // One by one extract an element from heap
      for (var i = N-1 ; i > 0; i--) {
          // Move current root to end
          var temp = mainArray[0];
          mainArray[0] = mainArray[i];
          mainArray[i] = temp;
          animations.push([i,0]);
          animations.push([i,0]);
          animations.push([i,mainArray[i]]);

          animations.push([i,0]);
          animations.push([i,0]);
          animations.push([0,mainArray[0]]);

          // call max heapify on the reduced heap
          heapify(mainArray, i, 0, animations);
      }
  }

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  function heapify(mainArray, N, i, animations)
  {
      var largest = i; // Initialize largest as root
      var l = 2 * i + 1; // left = 2*i + 1
      var r = 2 * i + 2; // right = 2*i + 2

      // If left child is larger than root
      if (l < N && mainArray[l] > mainArray[largest])
          largest = l;

      // If right child is larger than largest so far
      if (r < N && mainArray[r] > mainArray[largest])
          largest = r;

      // If largest is not root
      if (largest != i) {
          var swap = mainArray[i];
          mainArray[i] = mainArray[largest];
          mainArray[largest] = swap;
          animations.push([i,largest]);
          animations.push([i,largest]);
          animations.push([largest,mainArray[largest]]);

          animations.push([i,largest]);
          animations.push([i,largest]);
          animations.push([i,mainArray[i]]);

          // Recursively heapify the affected sub-tree
          heapify(mainArray, N, largest, animations);
      }
  }
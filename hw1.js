const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const sortedBackwardArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const randomArray = [5, 1, 3, 2, 4, 6, 7, 8, 10, 9]


function quickSort(arr) {
  if (arr.length <= 1) {
      return arr;
  }
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const middle = [];
  const right = [];

  for (const element of arr) {
      if (element < pivot) {
          left.push(element);
      } else if (element > pivot) {
          right.push(element);
      } else {
          middle.push(element);
      }
  }

  return quickSort(left).concat(middle, quickSort(right));
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
      }
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
      return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);

  const merge = (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex] < right[rightIndex]) {
              result.push(left[leftIndex]);
              leftIndex++;
          } else {
              result.push(right[rightIndex]);
              rightIndex++;
          }
      }

      return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

const arrayLengths = [2, 5, 10, 50, 100, 500, 1000];
const maxArrayLength = 1000;
const numberOfTestRuns = 5;

function measureExecutionTime(sortFunction, arrayType, inputArray) {
    const startTime = performance.now();
    sortFunction([...inputArray]);
    const endTime = performance.now();
    return endTime - startTime; 
}

function runSortingTests() {
    for (let arrayLength = 2; arrayLength <= maxArrayLength; arrayLength *= 2) {
        let quickSortTotalTime = 0;
        let mergeSortTotalTime = 0;
        let bubbleSortTotalTime = 0;

        for (let run = 0; run < numberOfTestRuns; run++) {
            const randomArrayToTest = randomArray.slice(0, arrayLength);

            quickSortTotalTime += measureExecutionTime(quickSort, 'random', randomArrayToTest);
            mergeSortTotalTime += measureExecutionTime(mergeSort, 'random', randomArrayToTest);
            bubbleSortTotalTime += measureExecutionTime(bubbleSort, 'random', randomArrayToTest);
        }

        const quickSortAvgTime = quickSortTotalTime / numberOfTestRuns;
        const mergeSortAvgTime = mergeSortTotalTime / numberOfTestRuns;
        const bubbleSortAvgTime = bubbleSortTotalTime / numberOfTestRuns;

        console.log(`Array Length: ${arrayLength}`);
        console.log(`QuickSort - Avg Random Time: ${quickSortAvgTime.toFixed(4)} ms`);
        console.log(`MergeSort - Avg Random Time: ${mergeSortAvgTime.toFixed(4)} ms`);
        console.log(`BubbleSort - Avg Random Time: ${bubbleSortAvgTime.toFixed(4)} ms`);

        if (
            quickSortAvgTime < bubbleSortAvgTime &&
            mergeSortAvgTime < bubbleSortAvgTime
        ) {
            console.log(`QuickSort and MergeSort consistently outperform BubbleSort starting at array length: ${arrayLength}`);
        }
    }
}

runSortingTests();

function determineOutperformanceLength(sortFunction) {
    for (let arrayLength = 2; arrayLength <= maxArrayLength; arrayLength *= 2) {
        const sortedTime = measureExecutionTime(sortFunction, 'sorted', sortedArray.slice(0, arrayLength));
        const sortedBackwardTime = measureExecutionTime(sortFunction, 'sorted backward', sortedBackwardArray.slice(0, arrayLength));
        const randomTime = measureExecutionTime(sortFunction, 'random', randomArray.slice(0, arrayLength));

        if (sortedTime < bubbleSortTime &&
            sortedBackwardTime < bubbleSortTime &&
            randomTime < bubbleSortTime) {
            return arrayLength;
        }
    }
    return -1;
}

const bubbleSortTime = measureExecutionTime(bubbleSort, '', []);

const quickSortOutperformanceLength = determineOutperformanceLength(quickSort);
const mergeSortOutperformanceLength = determineOutperformanceLength(mergeSort);
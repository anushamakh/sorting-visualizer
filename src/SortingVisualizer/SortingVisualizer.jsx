import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort';
import SpeedSelector from './speedSelector';
import './SortingVisualizer.css';

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 315;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';




export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: '5', // Default medium speed
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    this.setState({array});
  }

  handleSpeedChange = (event) => {
    this.setState({ animationSpeed: event.target.value });
  };

  mergeSort() {
    const { array, animationSpeed } = this.state;
    const animations = getMergeSortAnimations(array);
    this.animateSorting(animations, animationSpeed);
  }

  quickSort() {
    const { array } = this.state;
    const animations = getQuickSortAnimations(array);
    this.animateSorting(animations);
  }

  heapSort() {
    const { array } = this.state;
    const animations = getHeapSortAnimations(array);
    this.animateSorting(animations);
  }

  bubbleSort() {
    const { array } = this.state;
    const animations = getBubbleSortAnimations(array);
    this.animateSorting(animations);
  }


  animateSorting(animations, speed) {
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getHeapSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  

  
  render() {
    const { array, animationSpeed } = this.state;

    return (
      <div className="sorting-container">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="controls-container">
          <button className="generate-array-button" onClick={() => this.resetArray()}>Generate New Array</button>
          <label className="select-speed">Select Speed:</label>
          <div className="speed-selector">
            <SpeedSelector selectedSpeed={animationSpeed} onSpeedChange={this.handleSpeedChange} />
          </div>
          <label className="select-sort">Select Sort:</label>
          <button className="sorting-button" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className="sorting-button" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="sorting-button" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="sorting-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          
        </div>
      </div>
        
        <div className="array-container">
          {/* Array bars rendering */}
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>    
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}


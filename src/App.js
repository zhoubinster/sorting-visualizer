import React, { useState } from 'react';
import './style.css';
import { quickSort, mergeSort, bubbleSort } from './SortAlgorithm';

const generateRandomArray = (size) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const App = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [speed, setSpeed] = useState('slow');
  const [algorithmCode, setAlgorithmCode] = useState('');

  const generateArray = () => {
    const newArray = generateRandomArray(20);
    setArray(newArray);
    console.log("newArray:"+newArray);
  };

  const startSorting = () => {
    if (algorithm === '') {
      alert('请选择排序算法');
      return;
    }
    console.log("algorithm:"+algorithm);
    setCode(algorithm); // 设置对应排序算法的代码

    // 复制一份待排序的数组，避免直接修改原始数组
    const newArray = [...array];

    // 根据选择的排序算法执行排序
    switch (algorithm) {
      case 'quick':
        quickSort(newArray, 0, newArray.length - 1);
        break;
      case 'merge':
        animateMergeSort(newArray, 0, newArray.length - 1);
        break;
      case 'bubble':
        animateBubbleSort(newArray);
        break;
      default:
        break;
    }
    console.log("after sort:"+array);
    setArray(newArray);

    // 显示排序过程的动画
    // animateSort(array);
  };

  // 根据选择的排序算法设置对应的代码
  const setCode = (algorithm) => {
    switch (algorithm) {
      case 'quick':
        setAlgorithmCode(quickSort.toString());
        break;
      case 'merge':
        setAlgorithmCode(mergeSort.toString());
        break;
      case 'bubble':
        setAlgorithmCode(bubbleSort.toString());
        break;
      default:
        setAlgorithmCode('');
        break;
    }
  };

  // 设置选择的排序算法
  const handleAlgorithmChange = (e) => {
    const selectedAlgorithm = e.target.value;
    setAlgorithm(selectedAlgorithm);
    setCode(selectedAlgorithm); // 设置对应排序算法的代码
  };

  const animateBubbleSort = (arr) => {
    let len = arr.length;
    let swapped;
    let i = 0;
  
    const animation = setInterval(() => {
      if (i < len - 1) {
        swapped = false;
        for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true;
          }
        }
        // 更新界面显示的排序数组
        setArray([...arr]);
        i++;
      } else {
        clearInterval(animation);
      }
    }, 1000); // 延迟时间，单位：毫秒
  };

  const animateMergeSort = (arr) => {
    const merge = (arr, left, mid, right) => {
      let temp = [];
      let i = left;
      let j = mid + 1;
      let k = 0;
  
      while (i <= mid && j <= right) {
        if (arr[i] < arr[j]) {
          temp[k++] = arr[i++];
        } else {
          temp[k++] = arr[j++];
        }
      }
  
      while (i <= mid) {
        temp[k++] = arr[i++];
      }
  
      while (j <= right) {
        temp[k++] = arr[j++];
      }
  
      for (let l = 0; l < k; l++) {
        arr[left + l] = temp[l];
      }
    };
  
    const mergeSortRec = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortRec(arr, left, mid);
        mergeSortRec(arr, mid + 1, right);
        merge(arr, left, mid, right);
        setTimeout(() => {
          // 更新界面显示的排序数组
          setArray([...arr]);
        }, 1000); // 设置延迟时间，单位：毫秒
      }
    };
  
    const mergeSort = () => {
      mergeSortRec(arr, 0, arr.length - 1);
    };
  
    mergeSort();
  };

  return (
    <div className="container">
      <div className="controls">
        <button onClick={generateArray}>生成待排序的数组</button>
        <select onChange={handleAlgorithmChange} value={algorithm}>
          <option value="">选择排序算法</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="bubble">Bubble Sort</option>
        </select>
        <button onClick={startSorting}>开始排序</button>
        <select onChange={(e) => setSpeed(e.target.value)}>
          <option value="slow">排序速度 - 慢</option>
          <option value="fast">排序速度 - 快</option>
        </select>
      </div>
      <div className="displayArea">
        <div className="algorithmCode">
          <pre>{algorithmCode}</pre>
        </div>
        {array.map((value, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{
                    height: `${value * 5}px`,
                    transitionDuration: speed === 'slow' ? '0.5s' : '0.1s', // 根据速度调整动画时长
                  }}
                ></div>
            ))}
      </div>
    </div>
  );
};

export default App;

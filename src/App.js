import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [algorithm, setAlgorithm] = useState('quick');
  const [speed, setSpeed] = useState('500');
  const [algorithmCode, setAlgorithmCode] = useState('');

  useEffect(() => {
    generateArray();
    setAlgorithm(algorithm);
    setCode(algorithm);
  }, []);

  const generateArray = () => {
    const newArray = generateRandomArray(20);
    setArray(newArray);
    console.log("newArray:" + newArray);
  };

  const startSorting = () => {
    if (algorithm === '') {
      alert('请选择排序算法');
      return;
    }
    console.log("algorithm:" + algorithm);
    // setCode(algorithm); // 设置对应排序算法的代码

    // 复制一份待排序的数组，避免直接修改原始数组
    const newArray = [...array];

    // 根据选择的排序算法执行排序
    switch (algorithm) {
      case 'quick':
        animateQuickSort(newArray, 0, newArray.length - 1);
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
    console.log("after sort:" + array);
    setArray(newArray);

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
    }, speed); // 延迟时间，单位：毫秒
  };

  const animateMergeSort = (arr, left = 0, right = arr.length - 1) => {
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

    const mergeSortRec = (arr, left, right, temp) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);

        mergeSortRec(arr, left, mid, temp);
        // 将中间结果保存到数组中
        // temp.push([...arr]);
        mergeSortRec(arr, mid + 1, right, temp);
        // 将中间结果保存到数组中
        // temp.push([...arr]);
        merge(arr, left, mid, right);
        console.log("arr:" + arr);
        // 将中间结果保存到数组中
        temp.push([...arr]);
      }
    };

    // 用于保存排序过程中的中间结果
    let tempArray = [];
    mergeSortRec(arr, 0, arr.length - 1, tempArray);
    console.log("tempArray:" + tempArray);

    // 通过循环逐步展示排序过程中的中间结果
    let index = 0;
    const animation = setInterval(() => {
      if (index < tempArray.length) {
        setArray(tempArray[index]);
        index++;
      } else {
        clearInterval(animation);
      }
    }, speed); // 设置延迟时间，单位：毫秒
  };

  const animateQuickSort = (arr) => {
    const partition = (arr, left, right) => {
      const pivot = arr[right]; // 选择数组最后一个元素作为基准值
      let i = left - 1;
      for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // 将小于基准值的元素交换到左侧
        }
      }
      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // 将基准值交换到正确的位置
      return i + 1; // 返回基准值的索引
    };

    const quickSortRec = (arr, low, high, temp) => {
      if (low < high) {
        const pi = partition(arr, low, high);

        quickSortRec(arr, low, pi - 1, temp);
        quickSortRec(arr, pi + 1, high, temp);
        console.log("arr:" + arr);
        // 将中间结果保存到数组中
        temp.push([...arr]);
      }
    };

    // 用于保存排序过程中的中间结果
    let tempArray = [];
    quickSortRec(arr, 0, arr.length - 1, tempArray);

    // 通过循环逐步展示排序过程中的中间结果
    let index = 0;
    const animation = setInterval(() => {
      if (index < tempArray.length) {
        setArray(tempArray[index]);
        index++;
      } else {
        clearInterval(animation);
      }
    }, speed); // 设置延迟时间，单位：毫秒
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <button className="btn btn-primary" onClick={generateArray}>GenerateNewArray</button>
        </div>
        <div className="col-3">
          <select className="form-select" onChange={handleAlgorithmChange} value={algorithm}>
            <option value="">Algorithm Selected</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="bubble">Bubble Sort</option>
          </select>
        </div>
        <div className="col-3">
          <select className="form-select" onChange={(e) => setSpeed(e.target.value)}>
            <option value="500">Speed - slow</option>
            <option value="200">speed - fast</option>
          </select>
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={startSorting}>start</button>
        </div>
      </div>

      <div className="separator"></div> {/* 分割条 */}
      <div className="row">
        <div className="col">
          <div className="displayArea">
            <div className="algorithmCode">
              <pre>{algorithmCode}</pre>
            </div>
            {array.map((value, index) => (
              <div key={index} className="barContainer">
                <div
                  className="bar"
                  style={{
                    height: `${value * 5}px`,
                    transitionDuration: speed === 'slow' ? '0.5s' : '0.1s', // 根据速度调整动画时长
                  }}
                ></div>
                <span className="barValue">{value}</span> {/* 显示数字的元素 */}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

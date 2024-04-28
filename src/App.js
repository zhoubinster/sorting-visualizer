import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { quickSort, mergeSort, bubbleSort, insertionSort } from './SortAlgorithm';

const generateRandomArray = (size) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
};

const App = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('quick');
  const [speed, setSpeed] = useState('500');
  const [algorithmCode, setAlgorithmCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [playFinished, setPlayFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempArray, setTempArray] = useState([]);// 用于保存排序过程中的中间结果
  const [additionalArray, setAdditionalArray] = useState([]);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    generateArray();
    setAlgorithm(algorithm);
    setCode(algorithm);
  }, []);

  const resetVar = () => {
    setIsPlaying(false);
    setPlayFinished(false);
    setCurrentStep(0);
    setTempArray([]);
    setAdditionalArray([]);
    setDesc('');
  }

  const isPreviousButtonDisabled = () => {
    return isPlaying || (!playFinished && currentStep === 0);
  };

  const isNextButtonDisabled = () => {
    return isPlaying || tempArray.length === 0 || (!playFinished && currentStep === tempArray.length - 1);
  };

  const isStartButtonDisabled = () => {
    return isPlaying;
  };

  const isGenerateNewArrayButtonDisabled = () => {
    return isPlaying;
  };

  const handlePreviousStep = () => {
    if (playFinished && currentStep > 0) {
      console.log("before currentStep:" + currentStep);
      setArray(tempArray[currentStep - 1]);
      setCurrentStep(currentStep - 1);
      console.log("after currentStep:" + currentStep);
      console.log("after tempArray:" + tempArray);
      console.log("after tempArray:" + tempArray.length);

    }
  };

  const handleNextStep = () => {
    if (playFinished && currentStep < tempArray.length - 1) {
      setArray(tempArray[currentStep + 1]);
      setCurrentStep(currentStep + 1);
    }
  };

  const playBack = (tempArray) => {
    let index = 0;
    setCurrentStep(index);
    setTempArray(tempArray);
    const animation = setInterval(() => {
      if (index < tempArray.length) {
        setArray(tempArray[index]);
        if(additionalArray.length > 0 && index < additionalArray.length) {
          setDesc(additionalArray[index]);
        }
        index++;
        setCurrentStep(index);
      } else {
        clearInterval(animation);
        setPlayFinished(true);
        setIsPlaying(false);
      }
    }, speed);
  }

  const generateArray = () => {
    resetVar();
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
    resetVar();
    setIsPlaying(true);

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
      case 'insert':
        animateInsertionSort(newArray);
        break;
      default:
        break;
    }
    console.log("after sort:" + array);
    // setArray(newArray);
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
      case 'insert':
        setAlgorithmCode(insertionSort.toString());
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

  const animateInsertionSort = (arr) => {
    let swapped = false;
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        swapped = true;
        tempArray.push([...arr]);
      }
      arr[j + 1] = key;
    }
    if (!swapped) {
      tempArray.push([...arr]);
    }
    playBack(tempArray);
  };

  const animateBubbleSort = (arr) => {
    let len = arr.length;
    let swapped = false;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          // 如果前一个元素大于后一个元素，则交换它们的位置
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          tempArray.push([...arr]);
        }
      }
    }

    if (!swapped) {
      tempArray.push([...arr]);
    }
    playBack(tempArray);
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

    mergeSortRec(arr, 0, arr.length - 1, tempArray);
    console.log("tempArray:" + tempArray);

    // 通过循环逐步展示排序过程中的中间结果
    playBack(tempArray); // 设置延迟时间，单位：毫秒
  };

  const animateQuickSort = (arr) => {
    const partition = (arr, left, right, temp) => {
      const pivot = arr[right]; // 选择数组最后一个元素作为基准值
      let i = left - 1;
      for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // 将小于基准值的元素交换到左侧
          temp.push([...arr]);
          additionalArray.push("pivot:"+pivot+",left:"+left+",right:"+right+",i:"+i+",j:"+j);
        }
      }
      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // 将基准值交换到正确的位置
      temp.push([...arr]);
      additionalArray.push("swap privot, from "+arr[i + 1]+" to "+ arr[right]+",i:"+(i+1));
      return i + 1; // 返回基准值的索引
    };

    const quickSortRec = (arr, low, high, temp) => {
      if (low < high) {
        const pi = partition(arr, low, high, temp);

        quickSortRec(arr, low, pi - 1, temp);
        quickSortRec(arr, pi + 1, high, temp);
        console.log("arr:" + arr);
        // 将中间结果保存到数组中
        temp.push([...arr]);
      }
    };

    quickSortRec(arr, 0, arr.length - 1, tempArray);
    playBack(tempArray);
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <h4 className='h4-font'>Sort Algorithm Visualizer</h4>
        </div>
        <div className="col-2">
          <button className="btn btn-primary" onClick={generateArray} disabled={isGenerateNewArrayButtonDisabled()}>GenerateNewArray</button>
        </div>
        <div className="col-2">
          <select className="form-select" onChange={handleAlgorithmChange} value={algorithm}>
            <option value="">Algorithm Selected</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="bubble">Bubble Sort</option>
            <option value="insert">Insert Sort</option>
          </select>
        </div>
        <div className="col-2">
          <select className="form-select" onChange={(e) => setSpeed(e.target.value)}>
            <option value="500">Speed - slow</option>
            <option value="200">speed - fast</option>
          </select>
        </div>

        <div className="col-1">
        </div>
      </div>

      <div className="separator"></div>
      {/* 分割条 */}
      <div className="row">
        <div className="col">
          <div className="displayArea">
            <div className='leftArea'>
              <div className="targetArray">
                <div>{"Target Array:  " + array.toString()}</div>
                <div>{"Runtime info:  "+desc}</div>
                <div className='buttonGroup'>
                  <button className="btn btn-primary" onClick={startSorting} disabled={isStartButtonDisabled()}>start</button>
                  {/* Previous Step Button */}
                  <p></p>
                  <button className="btn btn-primary me-2" onClick={handlePreviousStep} disabled={isPreviousButtonDisabled()}>
                    Previous Step
                  </button>
                  {/* Next Step Button */}
                  <button className="btn btn-primary" onClick={handleNextStep} disabled={isNextButtonDisabled()}>
                    Next Step
                  </button>
                </div>
                <div>

                </div>
              </div>
              <div className='leftSeparator'></div>
              <div className="algorithmCode">
                <pre>{"Algorithm Code:\n\n" + algorithmCode}</pre>
              </div>
            </div>
            <div className="rightArea">
              {array.map((value, index) => (
                <div key={index} className="barContainer">
                  <div
                    className="bar"
                    style={{
                      height: `${value * 5}px`,
                      transitionDuration: speed === 500 ? '0.5s' : '0.1s', // 根据速度调整动画时长
                    }}
                  ></div>
                  <span className="barValue">{value}</span> {/* 显示数字的元素 */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// SortAlgorithm.js

export const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, right);
    }
  };

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
  
  export const mergeSort = (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  };
  
  const merge = (arr, left, mid, right) => {
    const leftArray = arr.slice(left, mid + 1); // 左半部分数组
    const rightArray = arr.slice(mid + 1, right + 1); // 右半部分数组
    let i = 0,
      j = 0,
      k = left; // i：左半部分数组的索引，j：右半部分数组的索引，k：原始数组的索引

    // 比较左右两部分数组的元素，依次放入原始数组中
    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    // 将左半部分数组中剩余的元素放入原始数组中
    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    // 将右半部分数组中剩余的元素放入原始数组中
    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  };
  
  // 冒泡排序算法
  export const bubbleSort = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          // 如果前一个元素大于后一个元素，则交换它们的位置
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  };
  
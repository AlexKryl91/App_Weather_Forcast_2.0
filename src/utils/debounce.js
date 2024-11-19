// type TDebounce = (func: () => void, ms: number) => void;
// type TCallback = () => void;
// type TTimeout = number | undefined;

// function debounceFunction(func: TCallback, delay: number) {
//   let timeoutId: TTimeout;

//   return function () {
//     clearTimeout(timeoutId);

//     timeoutId = setTimeout(() => {
//       func.apply(this, arguments);
//     }, delay);
//   };
// }

// export default debounceFunction;

function debounceWrapper(func, delay) {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

export default debounceWrapper;
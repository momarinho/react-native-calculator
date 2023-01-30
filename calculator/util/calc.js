export const initialState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
};

export const handleNumber = (value, state) => {
  if (state.currentValue === '0') {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
  };
};

const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, previousValue: null };

  switch (operator) {
    case '+':
      return {
        currentValue: `${previous + current}`,
        ...resetState,
      };
    case '-':
      return {
        currentValue: `${previous - current}`,
        ...resetState,
      };
    case '*':
      return {
        currentValue: `${previous * current}`,
        ...resetState,
      };
    case '/':
      return {
        currentValue: `${previous / current}`,
        ...resetState,
      };

    default:
      return state;
  }
};

const calculator = (type, value, state) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'clear':
      return initialState;
    case 'posneg':
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case 'percentage':
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case 'operator':
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: '0',
      };
    case 'equal':
      return handleEqual(state);
    default:
      return state;
  }
};

export default calculator;

// const Calculator = () => {
//   const [previousValue, setPreviousValue] = useState(null);
//   const [nextValue, setNextValue] = useState('0');
//   const [op, setOp] = useState(null);

//   useEffect(() => {}, [op, nextValue, previousValue]);

//   const CalcOperations = {
//     '/': (firstValue, secondValue) => firstValue / secondValue,
//     '*': (firstValue, secondValue) => firstValue * secondValue,
//     '+': (firstValue, secondValue) => firstValue + secondValue,
//     '-': (firstValue, secondValue) => firstValue - secondValue,
//     '=': (/*firstValue,*/ secondValue) => secondValue,
//   };

//   const operation = () => {
//     let temporary = CalcOperations[op](
//       parseFloat(previousValue),
//       parseFloat(nextValue)
//     );

//     setOp(null);
//     setNextValue(String(temporary));
//     setPreviousValue(null);
//   };

//   const handleNumber = (number) => {
//     setNextValue(nextValue === '0' ? String(number) : nextValue + number);
//   };

//   const percentage = () => {
//     setNextValue(parseFloat(nextValue) / 100);
//   };

//   const decimal = () => {
//     if (!/\./.test(nextValue)) {
//       setNextValue(nextValue + '.');
//     }
//   };

//   const clear = () => {
//     setNextValue('0');
//     setPreviousValue(0);
//   };

//   const changeValueSign = () => {
//     setNextValue(parseFloat(nextValue) * -1);
//   };

//   const handleOperation = (value) => {
//     if (Number.isInteger(value)) {
//       handleNumber(parseInt(value, 10));
//     } else if (value in CalcOperations) {
//       if (op === null) {
//         setOp(value);
//         setPreviousValue(nextValue);
//         setNextValue('');
//       }
//       if (op) {
//         setOp(value);
//       }
//       if (previousValue && op && nextValue) {
//         operation();
//       }
//     } else if (value === 'c') {
//       clear();
//     } else if (value === '\xB1') {
//       changeValueSign();
//     } else if (value === '.') {
//       decimal();
//     } else if (value === '%') {
//       percentage();
//     }
//   };
// };

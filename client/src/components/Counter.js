import React, { useReducer } from 'react';

const reducer = (state, action) => { // action.type ; action.payload
  switch(action.type) {
    case 'COUNTER_PLUS': {
      return {
        counter: state.counter + 1
      };
    }
    case 'COUNTER_MINUS': {
      return {
        counter: state.counter - 1
      }
    }
    default: return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, {
    counter: 0
  });

  const increment = () => {
    const action = {
      type: 'COUNTER_PLUS'
    }
    dispatch(action);
  }

  const decrement = () => {
    const action = {
      type: 'COUNTER_MINUS'
    }
    dispatch(action);
  }

  return (
    <>
      <h1>{state.counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

export default Counter;

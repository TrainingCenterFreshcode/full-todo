import React, { useReducer } from 'react';
import { connect } from 'react-redux';

const Counter = (props) => {
  

  const increment = () => {
    const action = {
      type: 'COUNTER_PLUS'
    }
    props.dispatch(action);
  }

  const decrement = () => {
    const action = {
      type: 'COUNTER_MINUS'
    }
    props.dispatch(action);
  }

  console.log(props);

  return (
    <>
      <h1>{props.counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const WrappedCounter = connect(mapStateToProps)(Counter);

export default WrappedCounter;

/*

connect - функція, яка приймає два опціональні аргументи і підписує компоненту на оновлення стейту

- mapStateToProps
Функція, яка приймає ВЕСЬ стейт і повертає тільки ту частину стейту, яка потрібна саме цій компоненті





Каріювання функцій
f(a, b, c) -> f(a)(b)(c)

function add(x) {
    return function(y) {
        return x + y;
    }
}

add(2)(3) // 5

*/
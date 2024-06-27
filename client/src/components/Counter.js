import React from 'react';
import { connect } from 'react-redux';
import { incrementAction, decrementAction, changeStepAction, toggleThemeAction } from '../actions/actionCreator';

const Counter = (props) => {
  const onChangeStep = ({ target: { value } }) => {
    props.changeStep(Number(value));
  }

  const toggleTheme = () => {
    props.toggleTheme();
  }
  
  return (
    <div style={{ backgroundColor: props.themes.isLightMode ? 'white' : 'gray' }}>
      <h1>{props.counter.counter}</h1>
      <input type='number' name='step' value={props.counter.step} onChange={onChangeStep} />
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
      <button onClick={toggleTheme}>{props.themes.isLightMode ? 'Switch to Dark mode' : 'Switch to Light mode'}</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch(incrementAction()),
//     decrement: () => dispatch(decrementAction()),
//     changeStep: (value) => dispatch(changeStepAction(value)),
//     toggleTheme: () => dispatch(toggleThemeAction()) 
//   }
// }

const mapDispatchToProps = {
  increment: incrementAction,
  decrement: decrementAction,
  changeStep: changeStepAction,
  toggleTheme: toggleThemeAction
}

const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;

/*

connect - функція, яка приймає два опціональні аргументи і підписує компоненту на оновлення стейту

- mapStateToProps
Функція, яка приймає ВЕСЬ стейт і повертає тільки ту частину стейту, яка потрібна саме цій компоненті

-mapDispatchToProps
Функція, яка повертає обʼєкт, в якому наші actonCreator's огортаються dispatchem


Каріювання функцій
f(a, b, c) -> f(a)(b)(c)

function add(x) {
    return function(y) {
        return x + y;
    }
}

add(2)(3) // 5

*/




/*

задача: впровадити зміну кроку для лічильника

+ 1. actionType

+ 2. actionCreator

+ 3. actionCreator -> mapDispatchToProps

+ 4. Reducer (як оновити стан, якщо цей екшен прийшов в редьюсер)

+ 5. Написати обробник події зміни інпутика

*/
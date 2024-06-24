// Функції-генератори


function* myGenerator() {
  console.log('Строчка 1');
  yield 'Проміжний результат 1';
  console.log('Строчка 2');
  yield 'Проміжний результат 2';
  console.log('Строчка 3');
  yield 'Проміжний результат 3';
}


const gen = myGenerator();



function* mySecondGenerator(start, end) {
  for(let i = start; i <= end; i++) {
    yield i;
  }
}

const gen2 = mySecondGenerator(1, 4);




function* myThirdGenerator() {
  let value = yield;
  console.log(value);
}

const gen3 = myThirdGenerator();









// Ітератор (паттерн)
/*

Ітератор - обʼєкт, за допомгою якого можна перебирати структури не знаючи їхнього внутрішнього влаштування

Ітератор має метод next() - повертає наступний метод колекції
                        та властивість done - чи завершили ми обход, чи ні

*/

const numbers = [1, 2, 3, 4, 5];

const iterator = numbers[Symbol.iterator]();

// iterator.next() -> отримати наступний елемент

// customIterator

const myIterator = {
  data: [1, 2, 3, 4, 5],
  currentIndex: 0,
  next() {
    if(this.currentIndex < this.data.length) {
      return {
        value: this.data[this.currentIndex++],
        done: false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }
  }
}




/* ДЗ


Задача:

1. Написати функцію-генератор, яка генерує числа від 0 до 100.
З кожним викликом цього генератора, число інкрементується на 1.
2. За допомогою написаного генератора знайти суму чисел від 0 до 100.

(5050)


*/

function* numberGenerator(start, end) {
  for(let i = start; i <= end; i++) {
    yield i;
  }
}

const it = numberGenerator(0, 100);
let sum = 0;
for(let i = 0; i <= 100; i++) {
  const { value } = it.next();
  sum += value;
}
console.log(sum);
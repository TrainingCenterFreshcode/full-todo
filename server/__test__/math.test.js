function sum(a, b) {
  return Number(a) + Number(b);
}

describe('tests sum function', () => {
  test('Add 5 to 10 expect 15', () => {
    expect(sum(5, 10)).toBe(15);
  });
  
  test('Add 2:string to 3:string expect 5:number', () => {
    expect(sum('2', '3')).toBe(5);
  });
  
  test('add 0.1:number to 0.2:number expect 0.3:number', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

// toEqual
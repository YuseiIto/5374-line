import CSVToObject from "./CSVToObject";


test('CSVToObject Unit Test', () => {
  expect(() => CSVToObject('a,b\na')).toThrow(Error("Length error"));
  expect(() => CSVToObject('\na,b\na,b')).toThrow(Error("Empty first line"));

  expect(CSVToObject('a,b\r\na,b')).toMatchObject([{a:'a',b:'b'}]);
  expect(CSVToObject('a,b\na,b')).toMatchObject([{a:'a',b:'b'}]);
  expect(CSVToObject('a,b,c\na,b,c')).toMatchObject([{a:'a',b:'b',c:'c'}]);
  expect(CSVToObject('a,b,c\n1,2,3\n4,5,6')).toMatchObject([{a:'1',b:'2',c:'3'},{a:'4',b:'5',c:'6'}]);
  expect(CSVToObject('a,b,c\n1,2,3\n\n4,5,6')).toMatchObject([{a:'1',b:'2',c:'3'},{a:'4',b:'5',c:'6'}]);
  expect(CSVToObject('a,b,c\n1,2,3\n\n4,5,6\n')).toMatchObject([{a:'1',b:'2',c:'3'},{a:'4',b:'5',c:'6'}]);
});

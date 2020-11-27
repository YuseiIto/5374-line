import CSVToObject from "./CSVToObject";


test('CSVToObject Unit Test', () => {
  expect(() => CSVToObject('a,b\na,b')).toThrow(new Error("No 地名 column is included"));
  expect(() => CSVToObject('地名,a,b\na')).toThrow(Error("Length error"));
  expect(() => CSVToObject('\n地名,a,b\nc,a,b')).toThrow(Error("Empty first line"));

  
  expect(CSVToObject('地名,a,b\r\nArea1,a,b')).toMatchObject({Area1:{地名:'Area1',a:'a',b:'b'}});
  expect(CSVToObject('地名,a,b\nArea1,a,b')).toMatchObject({Area1:{地名:'Area1',a:'a',b:'b'}});
  expect(CSVToObject('地名,a,b,c\nArea1,a,b,c')).toMatchObject({Area1:{地名:'Area1',a:'a',b:'b',c:'c'}});
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\nArea2,4,5,6')).toMatchObject({Area1:{地名:'Area1',a:'1',b:'2',c:'3'},Area2:{地名:'Area2',a:'4',b:'5',c:'6'}});
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\n\nArea2,4,5,6')).toMatchObject({Area1:{地名:'Area1',a:'1',b:'2',c:'3'},Area2:{地名:'Area2',a:'4',b:'5',c:'6'}});
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\n\nArea2,4,5,6\n')).toMatchObject({Area1:{地名:'Area1',a:'1',b:'2',c:'3'},Area2:{地名:'Area2',a:'4',b:'5',c:'6'}});


});

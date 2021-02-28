import CSVToObject from './CSVToObject';

test('CSVToObject Unit Test', () => {
  expect(() => CSVToObject('a,b\na,b')).toThrow(
    new Error('No 地名 column is included')
  );
  expect(() => CSVToObject('地名,a,b\na')).toThrow(Error('Length error'));
  expect(() => CSVToObject('\n地名,a,b\nc,a,b')).toThrow(
    Error('Empty first line')
  );

  expect(CSVToObject('地名,a,b\r\nArea1,a,b')).toMatchObject({
    Area1: { 地名: 'Area1', a: 'a', b: 'b' },
  });
  expect(CSVToObject('地名,a,b\nArea1,a,b')).toMatchObject({
    Area1: { 地名: 'Area1', a: 'a', b: 'b' },
  });
  expect(CSVToObject('地名,a,b,c\nArea1,a,b,c')).toMatchObject({
    Area1: { 地名: 'Area1', a: 'a', b: 'b', c: 'c' },
  });
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\nArea2,4,5,6')).toMatchObject({
    Area1: { 地名: 'Area1', a: '1', b: '2', c: '3' },
    Area2: { 地名: 'Area2', a: '4', b: '5', c: '6' },
  });
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\n\nArea2,4,5,6')).toMatchObject({
    Area1: { 地名: 'Area1', a: '1', b: '2', c: '3' },
    Area2: { 地名: 'Area2', a: '4', b: '5', c: '6' },
  });
  expect(CSVToObject('地名,a,b,c\nArea1,1,2,3\n\nArea2,4,5,6\n')).toMatchObject(
    {
      Area1: { 地名: 'Area1', a: '1', b: '2', c: '3' },
      Area2: { 地名: 'Area2', a: '4', b: '5', c: '6' },
    }
  );
});

import {
  isSameDay,
  getNthXDay,
  isDateMatchesToSingleExpression,
  isDateMatchesToExpression,
} from './computeTrashToday';

test('Date comparison test', () => {
  expect(
    isSameDay(
      new Date('2020-11-28T01:07:53.095Z'),
      new Date('2020-11-28T01:07:53.095Z')
    )
  ).toBe(true); // 同じDate
  expect(
    isSameDay(
      new Date('2020-11-28T01:07:53.095Z'),
      new Date('2020-11-28T03:07:53.095Z')
    )
  ).toBe(true); // 時間が異なる

  expect(
    isSameDay(
      new Date('2020-11-28T01:07:53.095'),
      new Date('2020-11-28T01:21:00.005')
    )
  ).toBe(true);
  expect(
    isSameDay(
      new Date('2020-11-28T01:00:00.000'),
      new Date('2020-11-28T23:59:59.999')
    )
  ).toBe(true);

  expect(
    isSameDay(
      new Date('2020-11-28T01:07:53.095'),
      new Date('2020-11-22T01:21:00.000')
    )
  ).toBe(false);
  expect(
    isSameDay(
      new Date('2020-11-28T00:00:00.000'),
      new Date('2020-11-27T23:59:59.999')
    )
  ).toBe(false);
});

test('第N X曜日', () => {
  // 第一, 日曜始まり
  expect(getNthXDay(2020, 3, 0, 1)).toMatchObject(new Date('2020/03/01'));
  expect(getNthXDay(2020, 3, 1, 1)).toMatchObject(new Date('2020/03/02'));
  expect(getNthXDay(2020, 3, 2, 1)).toMatchObject(new Date('2020/03/03'));
  expect(getNthXDay(2020, 3, 3, 1)).toMatchObject(new Date('2020/03/04'));
  expect(getNthXDay(2020, 3, 4, 1)).toMatchObject(new Date('2020/03/05'));
  expect(getNthXDay(2020, 3, 5, 1)).toMatchObject(new Date('2020/03/06'));
  expect(getNthXDay(2020, 3, 6, 1)).toMatchObject(new Date('2020/03/07'));

  // 第一, 月曜始まり
  expect(getNthXDay(2020, 6, 0, 1)).toMatchObject(new Date('2020/06/07'));
  expect(getNthXDay(2020, 6, 1, 1)).toMatchObject(new Date('2020/06/01'));
  expect(getNthXDay(2020, 6, 2, 1)).toMatchObject(new Date('2020/06/02'));
  expect(getNthXDay(2020, 6, 3, 1)).toMatchObject(new Date('2020/06/03'));
  expect(getNthXDay(2020, 6, 4, 1)).toMatchObject(new Date('2020/06/04'));
  expect(getNthXDay(2020, 6, 5, 1)).toMatchObject(new Date('2020/06/05'));
  expect(getNthXDay(2020, 6, 6, 1)).toMatchObject(new Date('2020/06/06'));

  // 第一, 火曜始まり
  expect(getNthXDay(2020, 12, 0, 1)).toMatchObject(new Date('2020/12/06'));
  expect(getNthXDay(2020, 12, 1, 1)).toMatchObject(new Date('2020/12/07'));
  expect(getNthXDay(2020, 12, 2, 1)).toMatchObject(new Date('2020/12/01'));
  expect(getNthXDay(2020, 12, 3, 1)).toMatchObject(new Date('2020/12/02'));
  expect(getNthXDay(2020, 12, 4, 1)).toMatchObject(new Date('2020/12/03'));
  expect(getNthXDay(2020, 12, 5, 1)).toMatchObject(new Date('2020/12/04'));
  expect(getNthXDay(2020, 12, 6, 1)).toMatchObject(new Date('2020/12/05'));

  // 第一、水曜始まり
  expect(getNthXDay(2020, 7, 0, 1)).toMatchObject(new Date('2020/07/05'));
  expect(getNthXDay(2020, 7, 1, 1)).toMatchObject(new Date('2020/07/06'));
  expect(getNthXDay(2020, 7, 2, 1)).toMatchObject(new Date('2020/07/07'));
  expect(getNthXDay(2020, 7, 3, 1)).toMatchObject(new Date('2020/07/01'));
  expect(getNthXDay(2020, 7, 4, 1)).toMatchObject(new Date('2020/07/02'));
  expect(getNthXDay(2020, 7, 5, 1)).toMatchObject(new Date('2020/07/03'));
  expect(getNthXDay(2020, 7, 6, 1)).toMatchObject(new Date('2020/07/04'));

  // 第一、木曜始まり
  expect(getNthXDay(2020, 10, 0, 1)).toMatchObject(new Date('2020/10/04'));
  expect(getNthXDay(2020, 10, 1, 1)).toMatchObject(new Date('2020/10/05'));
  expect(getNthXDay(2020, 10, 2, 1)).toMatchObject(new Date('2020/10/06'));
  expect(getNthXDay(2020, 10, 3, 1)).toMatchObject(new Date('2020/10/07'));
  expect(getNthXDay(2020, 10, 4, 1)).toMatchObject(new Date('2020/10/01'));
  expect(getNthXDay(2020, 10, 5, 1)).toMatchObject(new Date('2020/10/02'));
  expect(getNthXDay(2020, 10, 6, 1)).toMatchObject(new Date('2020/10/03'));

  // 第一、金曜始まり
  expect(getNthXDay(2020, 5, 0, 1)).toMatchObject(new Date('2020/05/03'));
  expect(getNthXDay(2020, 5, 1, 1)).toMatchObject(new Date('2020/05/04'));
  expect(getNthXDay(2020, 5, 2, 1)).toMatchObject(new Date('2020/05/05'));
  expect(getNthXDay(2020, 5, 3, 1)).toMatchObject(new Date('2020/05/06'));
  expect(getNthXDay(2020, 5, 4, 1)).toMatchObject(new Date('2020/05/07'));
  expect(getNthXDay(2020, 5, 5, 1)).toMatchObject(new Date('2020/05/01'));
  expect(getNthXDay(2020, 5, 6, 1)).toMatchObject(new Date('2020/05/02'));

  // 第一、土曜始まり
  expect(getNthXDay(2020, 8, 0, 1)).toMatchObject(new Date('2020/08/02'));
  expect(getNthXDay(2020, 8, 1, 1)).toMatchObject(new Date('2020/08/03'));
  expect(getNthXDay(2020, 8, 2, 1)).toMatchObject(new Date('2020/08/04'));
  expect(getNthXDay(2020, 8, 3, 1)).toMatchObject(new Date('2020/08/05'));
  expect(getNthXDay(2020, 8, 4, 1)).toMatchObject(new Date('2020/08/06'));
  expect(getNthXDay(2020, 8, 5, 1)).toMatchObject(new Date('2020/08/07'));
  expect(getNthXDay(2020, 8, 6, 1)).toMatchObject(new Date('2020/08/01'));

  expect(getNthXDay(2020, 8, 0, 3)).toMatchObject(new Date('2020/08/16'));

  expect(getNthXDay(2020, 8, 6, 4)).toMatchObject(new Date('2020/08/22'));

  expect(getNthXDay(2020, 8, 6, 5)).toMatchObject(new Date('2020/08/29'));

  expect(() => getNthXDay(2020, 8, 6, 6)).toThrow(Error('Out of range'));

  expect(getNthXDay(2020, 1, 0, 3)).toMatchObject(new Date('2020/01/19'));
  expect(getNthXDay(2020, 1, 0, 4)).toMatchObject(new Date('2020/01/26'));
  expect(() => getNthXDay(2020, 1, 0, 5)).toThrow(Error('Out of range'));
});

test('Single Expression', () => {
  expect(isDateMatchesToSingleExpression('日', new Date('2020/03/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('月', new Date('2020/06/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('火', new Date('2020/12/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('水', new Date('2020/07/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('木', new Date('2020/10/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('金', new Date('2020/05/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('土', new Date('2020/08/01'))).toBe(
    true
  );

  expect(isDateMatchesToSingleExpression('土', new Date('2020/03/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('金', new Date('2020/06/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('木', new Date('2020/12/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('日', new Date('2020/07/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('火', new Date('2020/10/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('月', new Date('2020/05/01'))).toBe(
    false
  );
  expect(isDateMatchesToSingleExpression('水', new Date('2020/08/01'))).toBe(
    false
  );

  expect(isDateMatchesToSingleExpression('日1', new Date('2020/03/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('月1', new Date('2020/06/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('火1', new Date('2020/12/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('水1', new Date('2020/07/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('木1', new Date('2020/10/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('金1', new Date('2020/05/01'))).toBe(
    true
  );
  expect(isDateMatchesToSingleExpression('土1', new Date('2020/08/01'))).toBe(
    true
  );

  expect(
    isDateMatchesToSingleExpression('20200301', new Date('2020/03/01'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20200607', new Date('2020/06/07'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20201206', new Date('2020/12/06'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20200705', new Date('2020/07/05'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20201004', new Date('2020/10/04'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20200503', new Date('2020/05/03'))
  ).toBe(true);
  expect(
    isDateMatchesToSingleExpression('20200802', new Date('2020/08/02'))
  ).toBe(true);

  expect(
    isDateMatchesToSingleExpression('20200802', new Date('2020/03/01'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20200503', new Date('2020/06/07'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20201004', new Date('2020/12/06'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20200301', new Date('2020/07/05'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20201206', new Date('2020/10/04'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20200607', new Date('2020/05/03'))
  ).toBe(false);
  expect(
    isDateMatchesToSingleExpression('20200705', new Date('2020/08/02'))
  ).toBe(false);

  expect(isDateMatchesToSingleExpression('火5', new Date('2020/01/01'))).toBe(
    false
  );

  expect(() =>
    isDateMatchesToSingleExpression('hogehoge', new Date('2020/08/02'))
  ).toThrow(Error('Invalid area_days Expression'));
  expect(() =>
    isDateMatchesToSingleExpression('2020070a', new Date('2020/08/02'))
  ).toThrow(Error('Invalid area_days Expression'));
  expect(() =>
    isDateMatchesToSingleExpression('火a', new Date('2020/08/02'))
  ).toThrow(Error('Invalid area_days Expression'));

  expect(() =>
    isDateMatchesToSingleExpression('火a', new Date('2020/08/02'))
  ).toThrow(Error('Invalid area_days Expression'));
});

test('isDateMatchesToExpression', () => {
  expect(isDateMatchesToExpression('日', new Date('2020/01/05'))).toBe(true);
  expect(isDateMatchesToExpression('日', new Date('2020/01/12'))).toBe(true);
  expect(isDateMatchesToExpression('日', new Date('2020/01/19'))).toBe(true);
  expect(isDateMatchesToExpression('日', new Date('2020/01/26'))).toBe(true);

  expect(isDateMatchesToExpression('日1', new Date('2020/01/05'))).toBe(true);
  expect(isDateMatchesToExpression('日1', new Date('2020/01/12'))).toBe(false);
  expect(isDateMatchesToExpression('日1', new Date('2020/01/19'))).toBe(false);
  expect(isDateMatchesToExpression('日1', new Date('2020/01/26'))).toBe(false);

  expect(isDateMatchesToExpression('日 月', new Date('2020/01/05'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/06'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/12'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/13'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/19'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/20'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/26'))).toBe(true);
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/27'))).toBe(true);

  expect(isDateMatchesToExpression('日 月', new Date('2020/01/01'))).toBe(
    false
  );
  expect(isDateMatchesToExpression('日 月', new Date('2020/01/08'))).toBe(
    false
  );

  expect(isDateMatchesToExpression('日1 日3', new Date('2020/01/05'))).toBe(
    true
  );
  expect(isDateMatchesToExpression('日1 日3', new Date('2020/01/12'))).toBe(
    false
  );
  expect(isDateMatchesToExpression('日1 日3', new Date('2020/01/19'))).toBe(
    true
  );
  expect(isDateMatchesToExpression('日1 日3', new Date('2020/01/26'))).toBe(
    false
  );

  expect(isDateMatchesToExpression('20200105', new Date('2020/01/05'))).toBe(
    true
  );
  expect(isDateMatchesToExpression('20200105', new Date('2020/01/12'))).toBe(
    false
  );

  expect(
    isDateMatchesToExpression('日1 日3 20200112', new Date('2020/01/05'))
  ).toBe(true);
  expect(
    isDateMatchesToExpression('日1 日3 20200112', new Date('2020/01/12'))
  ).toBe(true);
  expect(
    isDateMatchesToExpression('日1 日3 20200112', new Date('2020/01/19'))
  ).toBe(true);
  expect(
    isDateMatchesToExpression('日1 日3 20200112', new Date('2020/01/26'))
  ).toBe(false);

  expect(isDateMatchesToExpression('日:1', new Date('2020/01/05'))).toBe(true);
  expect(isDateMatchesToExpression('日:2', new Date('2020/01/05'))).toBe(false);

  expect(isDateMatchesToExpression('日:1 2', new Date('2020/01/05'))).toBe(
    true
  );
  expect(isDateMatchesToExpression('日:2 3', new Date('2020/01/05'))).toBe(
    false
  );

  expect(
    isDateMatchesToExpression('日1 日3 20200112:2', new Date('2020/01/05'))
  ).toBe(false);
  expect(
    isDateMatchesToExpression('日1 日3 20200112:2', new Date('2020/01/12'))
  ).toBe(false);
  expect(
    isDateMatchesToExpression('日1 日3 20200112:2', new Date('2020/01/19'))
  ).toBe(false);
  expect(
    isDateMatchesToExpression('日1 日3 20200112:2', new Date('2020/01/26'))
  ).toBe(false);
});

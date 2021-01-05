// 場所選択メッセージ
import * as line from '@line/bot-sdk';

export default (): line.FlexMessage => {
  return {
    type: 'flex',
    altText: '収集エリアを選択してください',
    contents: {
      type: 'bubble',
      direction: 'ltr',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '収集エリアを選択',
            weight: 'bold',
            size: 'xl',
            align: 'start',
            wrap: true,
            contents: [],
          },
          {
            type: 'text',
            text: 'ごみの日情報を受信する収集エリアを選択してください。',
            wrap: true,
            contents: [],
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '大宝・大宝東・大宝西・金勝',
              text: '大宝・大宝東・大宝西・金勝エリア',
              data: JSON.stringify({
                type: 'selectArea',
                selectedAreaName: '大宝・大宝東・大宝西・金勝エリア',
              }),
            },
            color: '#002888',
            margin: 'sm',
            style: 'primary',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '治田・治田東・治田西',
              text: '治田・治田東・治田西エリア',
              data: JSON.stringify({
                type: 'selectArea',
                selectedAreaName: '治田・治田東・治田西エリア',
              }),
            },
            color: '#EA5600',
            margin: 'sm',
            style: 'primary',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '葉山・葉山東',
              text: '葉山・葉山東エリア',
              data: JSON.stringify({
                type: 'selectArea',
                selectedAreaName: '葉山・葉山東エリア',
              }),
            },
            color: '#058C30',
            margin: 'sm',
            style: 'primary',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text:
              '※ わからない方は、普段使用されているごみ収集カレンダーの見出し色を確認してください',
            size: 'xs',
            color: '#555555',
            wrap: true,
            contents: [],
          },
        ],
      },
    },
  };
};

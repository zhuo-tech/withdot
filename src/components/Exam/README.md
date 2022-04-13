## 测验组件V1.0
 1. 制作考试:
   1.1 题目类型 quType = RADIO 单选题; MULTI 多选题; JUDGE 判断题; SAQ 简单题; 填空题TKT;
   1.2 按照题目类型配置题目选项和答案
    ``` 
    exam: [{
         "questions": [{
            "quId": "1",
            "sort": '1',
            "quType": "MULTI", //单选题 多选题 判断题 连线题 排序题 
            "quName": "地球是圆的吗?", 
            "score": 2,
            "scoreWeight": false, //是否设置答案的分数
            "options":[
              {
                "id":"10901010891",
                "label":"A.是",
                "value": 1
              },
              {
                "label":"A.否",
                "value": 1
              },
            ],
            "answer":[1,2]
         },
         {
            "quId": "2",
            "quType": "SAQ", // 简答题 | 主观题 | 开放题
            "quName": "地球是圆的吗?",
            "sort": '2',
            "score": 2
         },
         {
            "quId": "3",
            "quType": "TKT", //填空题
            "quName": "${}是${}形的", 
            "sort": '3',
            "score": 2,
            "sortFlag": false ,// 是否顺序答题
            "scoreWeight": false, //是否设置答案的分数权重
            "answer":[{
                "label": '地球',
                "value": 1
            }]
         }
         ],
         "totalScore": 100,
         "passScore": 60,
         "lockFlag": true
    }]
      ``` 
 2. 考试
    学生考试记录
  ```     
  memberAnswers: [
          {
              "studentId": '1',
              "dotId": '1',
              "workerId":"1",
              "score": 60,
              "createTime": 2022-01-01,
              "answers": [{
                  "quId": "1",
                  "sort": '1',
                  "quType": "MULTI", //单选题 多选题 判断题 连线题 排序题 
                  "quName": "地球是圆的吗?", 
                  "score": 2,
                  "score_weight": false, //是否设置答案的分数
                  "options":[
                  {
                      "label":"A.是",
                      "value": 1
                  },
                  {
                      "label":"A.否",
                      "value": 1
                  },
                  ],
                  "originAnswers":[1,2], //正确答案
                  "currentAnswers":[1,2],  //学生答案
              }]
          }
      ]
  ``` 
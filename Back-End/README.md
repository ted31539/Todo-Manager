# Todo Manager Back-End

## server 功能
### 取得 todos 列表

```
[API]: /api/todo
[參數]: 無       
[方法]: get
[成功回應]:
	{
        "success": true,
        "data": {
                -NAKaVNQpGJIn0mYVTxc: {completed: true, todo: '打籃球'}
                -NAKacmyz9YVD80x30Nx: {completed: false, todo: '打拳擊'}
                -NATG2UavH-Xi1T9GIBb: {completed: false, todo: '打野球'}
                -NATG58QTdAfuuIk9GCD: {completed: false, todo: '打傳說'}
                -NAU5eqoJhLNpffHh1hu: {completed: false, todo: '游泳'}
         },               
        "messages": "讀取todoList成功"
    }
```

### 取得單一 todo 細節

```
[API]: /api/todo/:id
[參數]: @id = '-NAKaVNQpGJIn0mYVTxc'
[方法]: get
[成功回應]:
	{
     "success": true,
     "id": "-NAKaVNQpGJIn0mYVTxc",
        "data": {
                  "todo": {
                          "completed": true,
                          "todo": "打籃球"
                }
        },               
     "messages": "讀取 todo 成功"
  }
[失敗回應]: 找不到 todo
    {
      "statusCode": 404,
      "success": false,
      "message": "該代辦事項不存在"
    }
```

### 新增 todo

```
[API]: /api/todo
[參數]: @id = '-NAKaVNQpGJIn0mYVTxc'
[方法]: post
[成功回應]:
	{
     "success": true,
     "id": "-NAKaVNQpGJIn0mYVTxc"
      "data": {
                "todo": {
                          "completed": true,
                          "todo": "打籃球"
                }
      },               
     "messages": "已新增todo"
  }
[失敗回應]: 找不到 todo
    {
      "statusCode": 412,
      "success": false,
      "message": "新增todo不可沒內容"
    }
```

### 更新購物車

```
[API]: /api/todo/:id
[參數]: @id = '-NAKaVNQpGJIn0mYVTxc'
[方法]: patch
[成功回應]:
	{
     "success": true,
     "id": "-NAKaVNQpGJIn0mYVTxc"
      "data": {
                "todo": {
                          "completed": true,
                          "todo": "打籃球"
                }
      },               
     "messages": "已更新該代辦事項"
  }
[失敗回應]: 找不到 todo
    {
      "statusCode": 404,
      "success": false,
      "message": "該代辦事項不存在"
    }
```

### 刪除某一筆 todo

```
[API]: /api/todo/:id
[參數]: @id = '-NAKaVNQpGJIn0mYVTxc'
[方法]: delete
[成功回應]:
	{
     "success": true,     
      "data": {
                "todo": {
                          "completed": true,
                          "todo": "打籃球"
                }
      },               
     "messages": "已刪除該代辦事項"
  }
[失敗回應]: 找不到 todo
    {
      "statusCode": 404,
      "success": false,
      "message": "該代辦事項不存在"
    }
```

## 使用技術
-Node.js
-Express.js

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
node app.js
```

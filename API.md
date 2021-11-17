# 日程管理 API 接口文档

## API V1 接口说明

- 接口基准地址：`http://localhost:8888/calendar/`
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。

### 通用返回状态说明

| *状态码* |         *含义*        |                        *说明*                       |
|----------|-----------------------|-----------------------------------------------------|
|      200 | OK                    | 请求成功                                            |
|      201 | CREATED               | 创建成功                                            |
|      204 | DELETED               | 删除成功                                            |
|      400 | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
|      401 | UNAUTHORIZED          | 未授权                                              |
|      403 | FORBIDDEN             | 被禁止访问                                          |
|      404 | NOT FOUND             | 请求的资源不存在                                    |
|      422 | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
|      500 | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

---

## 登录

### 登录验证接口✔

* 请求路径：user/login
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| nickname | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

* 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| user_id  | 用户 ID  |                 |
| nickname | 用户名   |                 |
| token    | 令牌     | 基于 jwt 的令牌 |

* 响应数据

```javascript
{
    "data": {
        "user_id": 500,
        "nickname": "admin",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
```

## 用户管理

### 添加用户✔

* 请求路径：users
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| nickname | 用户名称 | 不能为空 |
| password | 用户密码 | 不能为空 |

* 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| user_id  | 用户 ID  |      |
| nickname | 用户名   |      |

* 响应数据

```javascript
{
    "data": {
        "id": 28
    },
    "meta": {
        "msg": "用户创建成功",
        "status": 201
    }
}
```

### 根据 ID 查询用户信息✔

* 请求路径：users/:id
* 请求方法：get
* 请求参数

| 参数名  | 参数说明 | 备注                  |
| ------- | -------- | --------------------- |
| user_id | 用户 ID  | 不能为空`携带在url中` |

* 响应参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| user_id  | 用户 ID  |      |
| nickname | 用户昵称 |      |

* 响应数据

```javascript
{
    "data": {
        "id": 503,
        "username": "admin3"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 编辑用户提交✔

* 请求路径：users/update/:id
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注                        |
| -------- | -------- | --------------------------- |
| user_id  | 用户 id  | 不能为空 `参数是url参数:id` |
| nickname | 用户昵称 | 可以为空                    |
| password | 密码     | 可以为空                    |

* 响应参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| user_id | 用户 ID  |      |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
{
    "data": {
        "user_id": 503,
        "nickname": "admin3"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 删除单个用户

* 请求路径：users/del/:id
* 请求方法：post
* 请求参数

| 参数名  | 参数说明 | 备注                       |
| ------- | -------- | -------------------------- |
| user_id | 用户 id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

## 行程管理

### 添加行程✔

* 请求路径：itinerarys
* 请求方法：post
* 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| des    | 行程内容 | 不能为空 |
| type   | 行程类型 |          |
| start  | 开始时间 |          |
| end    | 结束时间 |          |

* 响应参数

| 参数名       | 参数说明 | 备注 |
| ------------ | -------- | ---- |
| itinerary_id | 行程ID   |      |

* 响应数据

```javascript
{
    "data": {
        "itinerary_id": 28
    },
    "meta": {
        "msg": "用户创建成功",
        "status": 201
    }
}
```

### 删除行程✔

* 请求路径：itinerarys/del/:id
* 请求方法：post
* 请求参数

| 参数名        | 参数说明 | 备注                       |
| ------------- | -------- | -------------------------- |
| itinerarys_id | 行程 id  | 不能为空`参数是url参数:id` |

* 响应参数

* 响应数据

```javascript
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

### 修改行程✔

* 请求路径：itinerarys/update/:id
* 请求方法：post
* 请求参数

| 参数名        | 参数说明 | 备注                        |
| ------------- | -------- | --------------------------- |
| itinerarys_id | 行程 id  | 不能为空 `参数是url参数:id` |
| des           | 行程内容 | 不能为空                    |
| type          | 行程类型 |                             |
| start         | 开始时间 |                             |
| end           | 结束时间 |                             |

* 响应参数

| 参数名        | 参数说明 | 备注 |
| ------------- | -------- | ---- |
| itinerarys_id | 行程 ID  |      |

* 响应数据

```javascript
/* 200表示成功，500表示失败 */
{
    "data": {
        "itinerarys_id": 503,
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 查询单个行程✔

* 请求路径：itinerarys/:id
* 请求方法：get
* 请求参数

| 参数名        | 参数说明 | 备注                  |
| ------------- | -------- | --------------------- |
| itinerarys_id | 行程ID   | 不能为空`携带在url中` |

* 响应参数

| 参数名        | 参数说明 | 备注 |
| ------------- | -------- | ---- |
| itinerarys_id | 行程ID   |      |
| des           | 行程内容 |      |
| type          | 行程类型 |      |
| start         | 开始时间 |      |
| end           | 结束时间 |      |

* 响应数据

```javascript
{
    "data": {
        "itinerarys_id": 503,
        "des": "去参会",
        "type": 0,
        "start": "2019-09-10",
        "end": "2019-09-10"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 查询当月所有行程✔

* 请求路径：itinerarys/mon/:id
* 请求方法：get
* 请求参数

| 参数名        | 参数说明 | 备注                  |
| ------------- | -------- | --------------------- |
| itinerarys_id | 行程ID   | 不能为空`携带在url中` |

* 响应参数

| 参数名        | 参数说明 | 备注 |
| ------------- | -------- | ---- |
| itinerarys_id | 行程ID   |      |
| des           | 行程内容 |      |
| type          | 行程类型 |      |
| start         | 开始时间 |      |
| end           | 结束时间 |      |

* 响应数据

```javascript
{
    "data": {
       "itinerarys": [
           {
                "itinerarys_id": 503,
                "des": "去参会",
                "type": 0,
                "start": "2019-09-10",
                "end": "2019-09-10"
           }
       ]
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

* 响应数据✔

```javascript
{
    "data": {
       [
           {
               "date": 2021-01-01,
                "itinerarys": [
                   {
                        "itinerarys_id": 503,
                        "des": "去参会",
                        "type": 0,
                        "start": "2019-09-10",
                        "end": "2019-09-10"
                   }
               ]
           },
           {
               "date": 2021-01-02,
                "itinerarys": []
           }
       ]
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

## 行程管理

### 查询所有类型✔

* 请求路径：types/
* 请求方法：get
* 请求参数

* 响应参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| type_id   | 类型ID   |      |
| type_name | 类型描述 |      |
| color     | 颜色     |      |

* 响应数据

```javascript
{
    "data": [
           {
                "type_id": 1,
                "type_name": "娱乐",
                "color": "#ffffff",
           }
       ]
    },
    "meta": {
        "msg": "操作成功",
        "status": 200
    }
}
```


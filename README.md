# Restaurant List
 > 第一版：用express完成簡單的餐廳推薦系統
 
 > 第二版(9/5)：更新功能-連接MongoDB，並引入CRUD功能
 
 > 第三版(9/6)：增加排序以及刪除確認的功能
 
 > 第四版(9/12):增加使用者登入，登出，編輯功能

## Features
- 使用者可以瀏覽全部所有餐廳
- 可以點擊任一餐廳，查看詳細資訊，如餐廳資訊，如地址、電話與簡介
- 提供`搜尋功能`(可依`中/英文名稱`或`類別`查詢喜愛的餐廳) (9/12功能優化)
- 使用者可以新增一家餐廳 (9/6)
- 使用者可以刪除一家餐廳 (9/6)
- 使用者可以修改一家餐廳的資訊 (9/6)
- 使用者可依評分、餐廳名字等關鍵字執行排序 (9/12功能優化)
- 使用者註冊功能（facebook)
- 使用者可登入並登出及修改使用者資料


## Quick view

![main page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/main.png)
![show page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/show.png)
![new page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/new.png)
![login page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/login.png)
![register page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/register.png)
![editProfile page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/editProfile.png)



## Environment set up
```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "mongoose": "^5.6.12",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0"
  }
```
### Installation.
1. Clone 此專案至電腦

```
git clone https://github.com/YunYuLo/restaurant_list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
$ [~] cd restaurant_List
```

3. 安裝 npm 套件

```
$ [~/restaurant_List]npm install <套件名稱>
```

4. 開啟本地 MongoDB 資料庫

5. 匯入預設餐廳資料(RestaurantSeeder.js)，完成後按下 ctrl + c 結束執行

```
$ [~/restaurant_List/models/seeds] node RestaurantSeeder.js 
```

6.導入.env
```
FACEBOOK_ID=xxxxxxxx
FACEBOOK_SECRET=xxxxxxxx
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

7. 啟動伺服器，執行 app.js 檔案

```
$ [~/restaurant_List]nodemon app.js
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3000

Mongodb is connected!
```

現在，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 你可透過預設使用者，開始使用囉！

預設使用者帳號密碼
```json
{
      "name": "vivi",
      "email": "vivi@gmail.com",
      "password": "123456"
    },
    {
      "name": "lili",
      "email": "lili@gmail.com",
      "password": "123456"
    },
```


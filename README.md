# Restaurant List
 > 第一版：用express完成簡單的餐廳推薦系統
 
 > 第二版(9/5)：更新功能-連接MongoDB，並引入CRUD功能

## Features
- 使用者可以瀏覽全部所有餐廳
- 可以點擊任一餐廳，查看詳細資訊，如餐廳資訊，如地址、電話與簡介
- 提供`搜尋功能`(可依`中/英文名稱`或`類別`查詢喜愛的餐廳)
- 使用者可以新增一家餐廳 (new)
- 使用者可以刪除一家餐廳 (new)
- 使用者可以修改一家餐廳的資訊(new)

## Quick view

![main page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/main.png)
![show page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/show.png)
![new page](https://raw.githubusercontent.com/YunYuLo/restaurant_list/master/public/img/new.png)


## Environment set up
- Node.js
- Express
- Express-handlebars
- Mongoose

### Installation
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

6. 啟動伺服器，執行 app.js 檔案

```
$ [~/restaurant_List]nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3000

Mongodb is connected!
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用囉！

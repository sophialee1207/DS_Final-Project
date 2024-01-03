# 專案設定指南

## ＊＊專案架構＊＊
- ![Alt text](image.png)

## 需求工具及程式
### 1. 前端網頁
### 2. 後端程式
### 3. Nginx
### 4. Fluentd
### 5. MongoDB

---

## ＊＊Nginx代理服務器＊＊
- 我們的專案選擇使用 Nginx 作為網頁伺服器和反向代理服務器，用於附載平衡．
- 已經準備好了 `nginx.config` 設定檔，它包含了本專案的配置設定。

### 安裝與設定 Nginx
```
1. 下載並安裝 Nginx。
2. 將 `nginx.config` 文件放置於 Nginx 的根目錄下。
3. 根據 `nginx.config` 中的指示配置 Nginx。
4. 重啟 Nginx 以使配置生效。
```
### 補充說明
使用 nginx 進行服務負載平衡。配置如下：
- service1 啟動於 `localhost:3000`
- service2 啟動於 `localhost:3001`
- nginx 將輪流將請求轉發至 service1 和 service2


---

## ＊＊前端網頁＊＊
- 使用React開發簡易的訂購商品網頁，用於發送資料到後端．
- 已經準備好了 `frontend` 資料夾，它包含了為本專案的網頁原始碼。

### 安裝與執行
```
1. 下載並安裝 [Node.js](https://nodejs.org/)。
2. 使用cmd進入frontend的根目錄。
3. 執行 npm install
4. 執行 npm start 可開啟網頁專案．
```

### 補充說明
- 由於port佔用的問題，網頁專案要在最後開啟：



## ＊＊後端程式＊＊
- 使用Node.js架設兩個後端程式，接受前端發送的訂單，並且儲存Logs．
- 已經準備好了 `backend` 資料夾，它包含了為本專案的後端原始碼。

### 安裝與執行
```
1. 下載並安裝 [Node.js](https://nodejs.org/)。
2. 使用cmd進入backend的根目錄。
3. 執行 npm install
4. 編輯 index.js與index2.js的38 行程式碼，根據自己的電腦調整存檔路徑．
5. 執行 node index.js 可開啟1號Server．
6. 執行 node index2.js 可開啟2號Server．
```

### 補充說明
- 由於port佔用的問題，要在網頁開啟前運行，確認佔用3000與3001：
- 注意要更改路徑，確保後續的Fluentd可讀到log
- `index.js` 和 `index2.js` 提供 post 方法，接收訊息後寫入至各自的 log 檔。


## ＊＊Fluentd＊＊
- 我們的專案選擇使用 Fluentd 作為日誌管理的工具．
- 已經準備好了 `fluentd.config` 設定檔，它包含了本專案的配置設定。

### 安裝與設定 Fluentd
- 官方網站下載 fluentd
- 調整config檔案中source路徑，設為後端程式log的存儲路徑。
- 安裝 fluentd 的 mongodb 套件
- 設定 mongodb 登入資訊

### 補充說明
- 當 service1 或 service2 寫入 log 時，fluentd 會監控並將新增的段落匯入指定的 mongodb Database 與 Collection。


## ＊＊MongoDB＊＊
- 我們的專案選擇使用 MongoDB 作為最後儲存日誌的資料庫．

### 安裝與設定 
- 官方網站下載 MongoDB
- 設定 mongodb 登入資訊

### 補充說明
- 作為最後儲存的資料庫，不需要做太多的設定．


## ＊＊操作流程＊＊
- 在開始前，確認上述步驟都完成且ＯＫ．
- 此為Demo的操作步驟
    1. 確定MongoDB、Fluentd、Nginx正常運行中
    2. 開啟server 1 和 server 2
    3. 開啟網頁專案，可多開分頁
    4. 輸入訂購者姓名
    5. 選擇商品加入購物車
    6. 送出訂單
    7. 到後端cmd查看收到的訊息
    8. 到Server 的Log查看是否正常儲存
    9. 連續發送訂單，數量建議大於5筆，使系統觸發分流
    10. 分別查看兩個後端的log
    11. 到DB查看是否有被儲存且經過Fluentd整理

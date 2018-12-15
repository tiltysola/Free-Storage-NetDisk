前端后台的文件应该都知道吧
#### 前端： front-end-vue-js
#### 后台： back-end-node-js

### 基本使用方法：
1. 前端使用 npm run build 对 Vue.js 进行编译，然后编译后的文件打包在 dist 文件夹中。  
2. 将 dist 文件夹中的所有文件复制到后台的 public 目录中，再在 public 目录中创建 cookies 和 uploads 文件夹。  
3. 最后在后台使用 node bin/www 就可以运行服务器了！  

### 修改端口：
文本编辑器打开后台的 bin/www 文件，将  
  var port = normalizePort(process.env.PORT || '3000');  
修改为  
  var port = normalizePort(process.env.PORT || '80');  
即可。  

G41计划网盘：http://www.g41.moe/

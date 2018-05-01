/*
 * @Author: iceStone
 * @Date:   2016-01-26 15:12:42
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 15:35:10
 */

'use strict';

// 可以用来创建一个HTTP服务器
var http = require('http');

// 创建一个服务
var server = http.createServer(function(request, response) {
  var requestUrl = request.url;
  switch (requestUrl){
    case '/signin' :
          // 请求登陆页面
          signin(request,response);
          break;
    case '/post':
          //提交表单
          post(request,response);
          break;
    default:
          response.writeHead(404,{});
          response.end();
          break;
  }
});
 /* var requestUrl = request.url;
  switch (requestUrl) {
    case '/signin':
      // 请求登陆页面
      signin(request, response);
      break;
    case '/post':
      // 提交表单
      post(request, response);
      break;
    default:
      response.writeHead(404, {});
      response.end();
      break;
  }
});*/
// 启动服务
server.listen(8080, function(error) {
  console.log('成功监听8080端口');
});

function signin(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.write('<!DOCTYPE html>');
  response.write('<html lang="en">');
  response.write('');
  response.write('<head>');
  response.write('  <meta charset="UTF-8">');
  response.write('  <title>登陆表单</title>');
  response.write('</head>');
  response.write('');
  response.write('<body>');
  response.write('  <form action="/post" method="post">');
  response.write('    <table border="1">');
  response.write('      <tr>');
  response.write('        <td>用户名</td>');
  response.write('        <td>');
  response.write('          <input type="text" name="username">');
  response.write('        </td>');
  response.write('      </tr>');
  response.write('      <tr>');
  response.write('        <td>密码</td>');
  response.write('        <td>');
  response.write('          <input type="password" name="password">');
  response.write('        </td>');
  response.write('      </tr>');
  response.write('      <tr>');
  response.write('        <td></td>');
  response.write('        <td>');
  response.write('          <input type="submit">');
  response.write('        </td>');
  response.write('      </tr>');
  response.write('    </table>');
  response.write('  </form>');
  response.write('</body>');
  response.write('');
  response.write('</html>');
  response.end();
}


var querystring = require('querystring');

function post(request, response) {
   console.log('表单提交');
  var postData = ''; // http传递的都是字符串
  request.on('data', function(part) {
    postData += part;
  });
  request.on('end', function() {
     //username=admin&password=admin
    var obj = querystring.parse(postData); // 将字符串转换为对象
    console.log(obj);
  });
  response.end();
}

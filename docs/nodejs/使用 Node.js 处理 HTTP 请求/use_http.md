# 使用 Node.js 处理 HTTP 请求

## 启动一个 HTTP 服务

用 http 模块的 [createServer 方法](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#httpcreateserveroptions-requestlistener)创建一个 server，监听端口 8000，将文件命名为 server.js：

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('response text');
});

server.listen(8000);
```

通过 node 启动 server.js：

```bash
node server.js
```

这样一个 Node.js 的 HTTP 服务便启动了，在 Postman 中访问 http:\/\/localhost:8000，可以收到返回的字符串 response text。

## 参数获取

### 路径参数、查询参数

利用 [URL 接口](https://developer.mozilla.org/en-US/docs/Web/API/URL) 解析 req.url 可以获取其中的路径参数及查询参数，比如：

```js
const url = new URL(req.url, base);
const path = url.pathname;
const searchParams = url.searchParams;
const title = searchParams.get('title');
```

### Body 数据

Body 数据需要通过监听事件获取，比如：

```js
const getBodyData = (req) => {
  const promise = new Promise((resolve, reject) => {
    const chunks = [];
    req
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        try {
          const contentType = req.headers['content-type'];
          if (contentType === 'application/json') {
            const stringifyData = chunks.join('');
            resolve(JSON.parse(stringifyData));
          } else {
            resolve({});
          }
        } catch (reason) {
          reject(reason);
        }
      });
  });
  return promise;
};
```

不同的 Content-Type 收到的 chunk 不同，需要做不同的处理，比如在收到 Content-Type 为 multipart/form-data 的请求时需要根据其中的 boundary 来分割数据：

```js
if (/^multipart\/form-data; boundary=.+$/.test(contentType)) {
  const files = {},
    fields = {};
  const [, boundary] = /^multipart\/form-data; boundary=(.+)$/.exec(contentType);
  const stringData = Buffer.concat(chunks).toString('binary');
  stringData.split(`--${boundary}`).forEach((item) => {
    if (/Content-Disposition: form-data; name=.+/.test(item)) {
      const [, disposition] = /Content-Disposition: form-data; (name=.+)/.exec(item);
      const dispositionObj = Object.fromEntries(
        disposition
          .split('; ')
          .map((v) => v.split('='))
          .map(([key, val]) => {
            if (key === 'filename*') return [key, decodeURIComponent(val).replace(/^UTF-8''/, '')];
            return [key, val.replace(/^"(.+)"$/, '$1')];
          }),
      );
      if (dispositionObj.filename) {
        const stringData = item.replace(
          /(\r\n)Content-Disposition: form-data; name=.+\1Content-Type: .+\1{2}([\s\S]*)\1$/,
          '$2',
        );
        const fileData = {
          name: dispositionObj['filename*'] || dispositionObj.filename,
          buffer: Buffer.from(stringData, 'binary'),
        };
        if (!files[dispositionObj.name]) files[dispositionObj.name] = [];
        files[dispositionObj.name].push(fileData);
      } else {
        const stringData = item.replace(/(\r\n)Content-Disposition: form-data; name=.+\1{2}([\s\S]*)\1$/, '$2');
        if (!fields[dispositionObj.name]) fields[dispositionObj.name] = [];
        fields[dispositionObj.name].push(stringData);
      }
    }
  });
  resolve({ files, fields });
}
```

## 静态资源

可以利用文件系统的 [readFile 方法](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#filehandlereadfileoptions) 读取静态资源，然后将 Content-Type 设置为对应的格式，比如：

```js
const getStaticFile = async (fid) => {
  const filePath = path.join(__dirname, `../static/${fid}`);
  return new Promise((resolve, reject) => {
    fs.readFile(decodeURIComponent(filePath), (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

if (method === 'GET' && /^\/static\/image\/.+$/.test(path)) {
  const [, fid] = /^\/static\/image\/(.+)$/.exec(path);
  const file = await getStaticFile(fid).catch(() => null);
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(file);
}
```

## 跨域请求

设置 Resources Headers 中的 Access-Control-Allow-Origin 为对应的域，如果需要设置多个 Origin 可以利用 req.headers.origin 判断，比如：

```js
if (['http://localhost:3000'].includes(req.headers.origin)) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
}
```

let PORT = 80;

let http = require("http");
let path = require("path");
let httpProxy = require("http-proxy");

let proxy = httpProxy.createProxyServer({
    // target: 'http://192.168.2.16:28080',   //接口地址
    // 下面的设置用于https
    // ssl: {
    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
    //     cert: fs.readFileSync('server.crt', 'utf8')
    // },
    // secure: false
});
proxy.on("error", function(err, req, res) {
    res.writeHead(500, {
        "content-type": "text/plain"
    });
    console.log(err);
    res.end(
        "Something went wrong. And we are reporting a custom error message."
    );
});

let server = http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    console.log(req.url);
    if (req.url.indexOf("api") >= 0 && req.url.indexOf("login") >= 0) {
        proxy.web(req, res, { target: "http://127.0.0.1:8081/" });
    } else if (req.url.indexOf("api") >= 0) {
        proxy.web(req, res, { target: "http://127.0.0.1:8081/" });
    } else {
        proxy.web(req, res, { target: "http://127.0.0.1:8081/" });
    }
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");

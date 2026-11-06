
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const files = {
    "/": ["index.html", "text/html"],
    "/style.css": ["style.css", "text/css"],
    "/script.js": ["script.js", "text/javascript"]
};

const server = http.createServer((req, res) => {
    const resource = files[req.url];

    if (!resource) {
        res.writeHead(404);
        res.end("Page Not Found");
        return;
    }

    const [filename, contentType] = resource;

    fs.readFile(path.join(__dirname, filename), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Server Error");
            return;
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

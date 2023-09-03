const fs = require("fs");

const reqHandler = (req, res) => {
  if (req.url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      console.log(err);
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(
        `<body><h1>${data}<h1> </br> <form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>`
      );
      res.write("</html");
      return res.end();
    });
  }
  if (req.url === "/message" && req.method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[0];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<html>");
  //   res.write("<body><h1>Hello</h1></body>");
  //   res.write("</html");
  //   res.end();
};

module.exports = reqHandler;

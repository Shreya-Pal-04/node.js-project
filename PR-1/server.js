const http = require('http');
const fs = require('fs');

const requstCycle = (req, res) => {
    let filepath = "";

    switch(req.url){
        case "/":
            filepath = './index.html';
            break;
        case "/about":
            filepath = './about.html';
            break;
        case "/product":
            filepath = './product.html';
            break;
        default:
            filepath = './default.html';
            break;
    }
    let result = fs.readFileSync(filepath, 'utf-8');
    res.end(result);
}
    const server = http.createServer(requstCycle);

    server.listen(8100, (err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('server start at http://localhost:8100');
    });
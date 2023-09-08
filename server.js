const http = require(`http`);
const fs = require(`fs`);
function writeDir() {
    fs.readdir("./assets/img", (err, content) => {
        var sendDir = JSON.stringify(content);
        fs.writeFile("./messenger.json", sendDir, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`wrote file`);
            }
        });
        console.log(content);
    })
}
let temp;
// function getDir(urlString) {
//     // detects
//     fs.readdir("./assets/img", (err,content) => {
//         temp = JSON.stringify(content);
//         console.log(temp);
//     })
// }



const server = http.createServer((req, res) => {
    console.log(`request made`);
    console.log(req.url, req.method);


    let path = `./html/`
    if(req.url.includes(".jpg"||`.png`||`.gif`)) {
        switch (req.url.slice(req.url.length - 4, req.url.length - 1)) {
            case `.jpg` :
                res.setHeader(`Content-Type`, `image/jpg`);
                path = req.url;
            
            break;
            case `.png` :
                res.setHeader(`Content-Type`, `image/png`);
                path = req.url;
            break;
            case `.gif` :
                res.setHeader(`Content-Type`, `image/gif`);
                path = req.url;
            break;
        }
    } else {
        switch (req.url) {
            case `/`:
                res.setHeader(`Content-Type`, `text/html`);
                path += `index.html`;
                break;
            case `/assets/css/style.css`:
                res.setHeader(`Content-Type`, `text/css`)
                path = `./assets/css/style.css`;
                break;
            case `/assets/fonts/TF2.ttf`:
                res.setHeader(`Content-Type`, `font/css`)
                path = `./assets/fonts/TF2.ttf`
                break;
            case `/assets/fonts/tf2build.ttf`:
                res.setHeader(`Content-Type`, `font/css`)
                path = `./assets/fonts/tf2build.ttf`
                break;
            case `/assets/fonts/tf2secondary.ttf`:
                res.setHeader(`Content-Type`, `font/css`)
                path = `./assets/fonts/tf2secondary.ttf`
                break;
            case `/assets/img/medal.jpg`:
                res.setHeader(`Content-Type`, `image/jpeg`);
                path = `./assets/img/medal.jpg`;
                break;
            case `/assets/img/star.png`:
                res.setHeader(`Content-Type`, `image/png`);
                path = `./assets/img/star.png`
                break;
            case `/js/client.js`:
                res.setHeader(`Content-Type`, `text/javascript`);
                path = `./js/client.js`
                break;
            case `/node_modules/jquery/dist/jquery.min.js`:
                res.setHeader(`Content-Type`, `text/javascript`);
                path = `./node_modules/jquery/dist/jquery.min.js`
                break;
            case `/messenger.json`:
                writeDir();
                res.setHeader(`Content-Type`, `applicaiton/json`);
                path = `./messenger.json`
                break;
            default:
                    res.setHeader(`Content-Type`, `text/html`);
                path += `404.html`
                break;
        }
    }
    
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    })
})
server.listen(8000, `localhost`, () => {
    console.log(`listening for requests on port 8000`);
})

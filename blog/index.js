import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
console.log("begining ...");
const app = express();
const port = 3000;

const data = fs.readFileSync('post.json'); // Read the contents of the JSON file
const jsonPost = JSON.parse(data);  // Parse the JSON data into a JS object

var postLeng = Object.keys(jsonPost).length; // length of post data
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(jsonPost[1]['fName']);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.jsonPost;

function savePost(data) {
    if (postLeng == 0) {
        jsonPost[0] = data;
    } else {
        jsonPost[postLeng] = data;
    }
    // fs.writeFile("post.json", JSON.stringify(jsonPost), function(err, result) {
    //     if(err) console.log('error', err);
    // });
    fs.writeFileSync( "post.json", JSON.stringify(jsonPost) )
}
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/blog-post", (req, res) => {
    res.render("blog-post.ejs");
});

app.post("/post.json", (req, res) => {
    
    // console.log(req.body);
    savePost(req.body);
    res.render("index.ejs", {
        data : jsonPost,
        dataLen : postLeng
    });    
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

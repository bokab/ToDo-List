const express = require('express');
const bodyParser = require('body-parser');

const date = require(__dirname + "/node_modules/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


app.set('view engine', 'ejs');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', function (req, res) {


    const day = date.getDate();


    res.render("list", { listTitle: day, NewListItems: items });

});



app.post("/", function (req, res) {
    // newItem = name 
    const item = req.body.newItem;

    // list = name
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");

    } else {
        items.push(item);
        res.redirect("/");
    }

});



app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work List", NewListItems: workItems });
});



app.post("/work", function (req, res) {

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});
app.get("/about", function (req, res) {
    res.render("about");
})







app.listen(process.env.PORT || 4000, function () {
    console.log('Server is running on port 4000');
});



const express = require('express');
const port = 8001;
const path = require('path');

const db = require('./confing/mongoose');

const app = express();

app.set('view engine', 'ejs');// setting view-engine as ejs template
app.set('views', path.join(__dirname, 'views'));// defining path of views directory.
app.use(express.urlencoded());//it's a middle-ware, it is used for encoding the data in key value pair that browser has sended to the router.
app.use(express.static('assets')); // it's a middle-ware to access assets folder for beutyfy html, css js, and images files.

//Custom middle-ware, it can be multiple, and it can manipulate the data comming from browser
// app.use(function(req, res, next){ //middle-ware 1
//     console.log('middle-ware 1 called!');
//     next();
// });
// app.use(function(req, res, next){ //middle-ware 2
//     console.log('middle-ware 2 claaed!');
//     next();
// })

const contactList = [
    {
        name: "Ravindra",
        phone: "1234567890"
    },
    {
        name: "Tony Stark",
        phone: "9865851452"
    },
    {
        name: "Iron Man",
        phone: "7855223690"
    }
]

// ROUT=='/' part and CONTROLLERS== function(){} part ------rendering part on browser through puting data in view-engine templates.
app.get('/', function(req, res){  
   return res.render('home', {
    title: 'Contact List',
    contact_list: contactList
   });
});

app.get('/practice', function(req, res){  
    return res.render('practice', {
        title: 'Flying'
    });
 });

// this work as a ROUTER that catching the data from browser and sending data to the controller.
// data will catched in req as a object.
 app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    return res.redirect('back');// for staying on current page after clicking 'Add Contact' button
 })


//  for deleting a contact
 app.get('/delete-contact/:phone', function(req, res){
    console.log(req.params);
    //grt phone from url
    let phone = req.params.phone;

    let contactIndex = contactList.findIndex(indexI => indexI.phone === phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
 })

// -----------------------------error handle
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yup!My express server running on port', port);
});
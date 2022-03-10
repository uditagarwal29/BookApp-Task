const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const db = require('./config/mongoose')
const User = require('./models/user')


app.set('view engine', 'ejs');                     //setting view engins as ejs
app.set('views', path.join(__dirname, 'views'));  //setting views path to views folder to fetch ejs files

app.use(express.urlencoded());   //reads only the submitted form data not params
app.use(express.json());        //to allow express to take json files and to parse the json body recieved from user

//get all users
app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log("error in fetching users")
            return;
        }
        //passing the list of all users to ejs for rendering
        return res.render('home', {
            heading: "User List",
            user_list: users
        });
    })
});

//create user
app.post('/create-user', function (req, res) {
    //get create-user form data aad add to database
    User.create({
        name: req.body.name,
        email: req.body.email,
        referredUser: req.body.referredUser,
    }, function (err, newUser) {
        if (err) {
            console.log("error in creating user");
            return;
        }
        return res.redirect('back');
    })
});

//route to localhost/(mongoId of user)
app.get('/:id', function (req, res) {
    let id = req.params.id
    //finding user details with the id in params
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Cant find user with this id")
            return;
        }
        //updating isPaymentMade to true.
        user.isPaymentMade = true;

        //if user has referred to any other user 
        if (user.referredUser) {
            //increase the referred User's totalEarnings by 10
            User.findOneAndUpdate({ email: user.referredUser }, { $inc: { totalEarnings: 10 } }, { returnNewDocument: true }, function (err, doc) {
                if (err) {
                    console.log("Error in updating document");
                    return;
                }
            });
        }

        //save the changes made to isPaymentMode to mongo db
        user.save(function (err) {
            if (err) {
                console.error('ERROR!');
                return;
            }
        });
        res.redirect('back')
    })
});

//express server listening port
app.listen(PORT, function (err) {
    if (err) {
        console.log('ERROR connecting to server');
        return;
    }
    console.log('Server is up and running on port', PORT);
})



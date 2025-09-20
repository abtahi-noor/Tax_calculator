//console.log("server started");
const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const { checkUser } = require("./middleware/authMiddleware");

const login_info_users_model = require("./models/login_info_users_model.js")
const admin_creds_model = require("./models/admin_creds_model.js")
const incomeTaxVariables_model = require("./models/incomeTaxVariables_model.js")
const user_queries_model = require("./models/user_queries_model.js")
const admin_messages_model = require("./models/admin_messages_model.js")
const card_infos_model = require("./models/card_infos_model.js")
const gov_tax_infos_model = require("./models/gov_tax_infos_model.js")
const sec_keys_model = require("./models/sec_keys_model.js")

const session = require("express-session");
const store = new session.MemoryStore();
const user_info_model = require("./models/user_info_model.js"); 


const maxAge = 60 * 30 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, "cse471secret", {
        expiresIn: maxAge
    });
}


// middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
    secret: "some secret",
    cookie: { maxAge: 600000 },
    saveUninitialized: false,
    resave: true,
    store
}))

app.get('*', checkUser);

// routes
app.post('/signup', (req, res) => {
    const email = req.body.email;

    login_info_users_model.find({ email: email })
        .then((users) => {
            //console.log(users)
            if (users.length == 0) {
                login_info_users_model.create(req.body) // uploading body given by client to DB
                    .then((login_info_users) => res.json(login_info_users))  // responding back the uploaded body to client
                    .catch(err => res.json(err))
            } else {
                console.log("Email already exists")
                res.json("Email already exists")
            }
        })
})

//app.post('/signup', (req,res)=> {

//    login_info_users_model.create( req.body ) // uploading body given by client to DB
//    .then( (login_info_users) =>  res.json(login_info_users) )  // responding back the uploaded body to client
//    .catch( err => res.json(err) )
//})


app.post('/login', (req, res) => {
    const { email, password } = req.body;  // storing json body elements to variables which is sent by client 
    login_info_users_model.findOne({ email: email })  // find employee based on email
        .then((user) => {  // 'user' is the response about finding email, can name anything 
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                    /*
                    const token = createToken(user._);
                    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
                    res.status(200).json({user: user._id})
                    //req.session.authenticated = true;  // 
                    */
                    req.session.user = { email, password }; //
                    console.log(req.session.user.email); //
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("User not found")
            }
        })
})

/*
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    login_info_users_model.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    req.session.userEmail = email; // Store user email in the session
                    res.json({ message: "Success", user: user._id });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("User not found");
            }
        })
        .catch(err => res.json(err));
});

*/

// admin sign in
app.post('/authzone', (req, res) => {
    const { adminID, password } = req.body;  // storing json body elements to variables which is sent by client 
    admin_creds_model.findOne({ adminID: adminID })  // find employee based on email
        .then((admin) => {  // 'user' is the response about finding email, can name anything 
            if (admin) {
                if (admin.password === password) {
                    res.json("Success")
                    req.session.authenticated = true;
                    req.session.user = { adminID, password };

                } else {
                    res.json("Unauthorized Access")
                }
            } else {
                res.json("Unauthorized Access")
            }
        })
})

app.get("/viewUsers", (req, res) => {
    user_info_model.find()
        .then(user_informations => res.json(user_informations))
        .catch(err => res.json(err))

})


app.get("/userMessages", (req, res) => {
    const { email } = req.query;
    admin_messages_model.find({ userEmail: email })
        .then(messages => res.json(messages))
        .catch(err => res.json(err))

})

app.delete("/deleteMessage/:id", (req, res) => {
    const messageId = req.params.id;
    admin_messages_model.findByIdAndDelete(messageId)
      .then(() => res.json({ success: true }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

app.get("/adminMessages", (req, res) => {
    const { adminID } = req.query;
    user_queries_model.find()
        .then(messages => res.json(messages))
        .catch(err => res.json(err))

})

app.delete("/admindeleteMessage/:id", (req, res) => {
    const messageId = req.params.id;
    user_queries_model.findByIdAndDelete(messageId)
      .then(() => res.json({ success: true }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });



app.get("/userProfile", (req, res) => {
    const { email } = req.query; // Use req.query to get parameters from the query string
    user_info_model.findOne({ email: email })
        .then(user_information => res.json(user_information))
        .catch(err => res.json(err));
});



app.post('/addProfileInformation', (req, res) => {
    const { firstName, lastName, u, sex, nid_number, profession, dob } = req.body;
    console.log(u)

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: u,
        sex: sex,
        nid_number: nid_number,
        profession: profession,
        dob: dob
    };
    user_info_model.create(newUser)
        .then(user => {
            if (!user) {
                console.log(user)
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            res.json("Error Occured!!");
        });
});



app.post('/updateProfile', (req, res) => {
    const { firstName, lastName, u, sex, nid_number, profession, dob } = req.body;

    // Create an object to store only non-null and non-empty fields
    const updatedFields = {};

    // Check and update each field
    updatedFields.email = u;
    if (firstName !== null && firstName !== "") {
        updatedFields.firstName = firstName;
    }

    if (lastName !== null && lastName !== "") {
        updatedFields.lastName = lastName;
    }

    if (sex !== null && sex !== "") {
        updatedFields.sex = sex;
    }

    if (nid_number !== null && nid_number !== "") {
        updatedFields.nid_number = nid_number;
    }

    if (profession !== null && profession !== "") {
        updatedFields.profession = profession;
    }

    if (dob !== null && dob !== "") {
        updatedFields.dob = dob;
    }

    // Update the user's profile information with non-null and non-empty fields
    user_info_model.findOneAndUpdate(
        { email: u },
        { $set: updatedFields },
        { new: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            res.json("Error Occurred!!");
        });
});

/////////////////////////////////////////////////////
app.post('/incomeTaxCalc', (req, res) => {
    const { salary, months_num, rent, medical, transport, conveyance, incentive, bonus, bonus_num, radio } = req.body;   // storing json body elements to variables which is sent by client 
    //console.log(salary);
    //console.log(months_num);
    //console.log(rent);
    //console.log(medical);
    //console.log(transport);
    //console.log(conveyance);
    //console.log(incentive);
    //console.log(bonus);
    //console.log(bonus_num); 
    //console.log(radio);

    // total yearly salary
    let totalSalary = (Number(months_num) * (Number(salary) + Number(rent) + Number(medical) + Number(transport) + Number(conveyance) + Number(incentive))) + (Number(bonus) * Number(bonus_num));
    //console.log(totalSalary);
    //console.log(typeof totalSalary)

    let tax_free = totalSalary / 3  // Tax_free_income_divider = 3
    if (tax_free > 450000) {  // max_tax_free = 45000
        tax_free = 450000
    }

    let taxable = totalSalary - tax_free;
    //console.log(taxable)

    incomeTaxVariables_model.findOne()
        .then(variables => {
            //console.log(variables.maleCondition2);
            let tax = 0;
            let taxable_increment = 0;
            if (radio == "male") {
                while (taxable_increment < taxable) {
                    if (taxable_increment >= 0 && taxable_increment < variables.maleCondition1) {
                        tax += 0
                    } else if (taxable_increment >= variables.maleCondition1 && taxable_increment < variables.maleCondition2) {
                        tax += 5;
                    } else if (taxable_increment >= variables.maleCondition2 && taxable_increment < variables.maleCondition3) {
                        tax += 10;
                    } else if (taxable_increment >= variables.maleCondition3 && taxable_increment < variables.maleCondition4) {
                        tax += 15;
                    } else if (taxable_increment >= variables.maleCondition4 && taxable_increment < variables.maleCondition5) {
                        tax += 20;
                    } else if (taxable_increment >= variables.maleCondition5) {
                        tax += 25;
                    }
                    taxable_increment += 100
                }
            } else if (radio == "female") {
                while (taxable_increment < taxable) {
                    if (taxable_increment >= 0 && taxable_increment < variables.femaleCondition1) {
                        tax += 0
                    } else if (taxable_increment >= variables.femaleCondition1 && taxable_increment < variables.femaleCondition2) {
                        tax += 5;
                    } else if (taxable_increment >= variables.femaleCondition2 && taxable_increment < variables.femaleCondition3) {
                        tax += 10;
                    } else if (taxable_increment >= variables.femaleCondition3 && taxable_increment < variables.femaleCondition4) {
                        tax += 15;
                    } else if (taxable_increment >= variables.femaleCondition4 && taxable_increment < variables.femaleCondition5) {
                        tax += 20;
                    } else if (taxable_increment >= variables.femaleCondition5) {
                        tax += 25;
                    }
                    taxable_increment += 100
                }
            } else if (radio == "fighter") {
                while (taxable_increment < taxable) {
                    if (taxable_increment >= 0 && taxable_increment < variables.fighterCondition1) {
                        tax += 0
                    } else if (taxable_increment >= variables.fighterCondition1 && taxable_increment < variables.fighterCondition2) {
                        tax += 5;
                    } else if (taxable_increment >= variables.fighterCondition2 && taxable_increment < variables.fighterCondition3) {
                        tax += 10;
                    } else if (taxable_increment >= variables.fighterCondition3 && taxable_increment < variables.fighterCondition4) {
                        tax += 15;
                    } else if (taxable_increment >= variables.fighterCondition4 && taxable_increment < variables.fighterCondition5) {
                        tax += 20;
                    } else if (taxable_increment >= variables.fighterCondition5) {
                        tax += 25;
                    }
                    taxable_increment += 100
                }
            }
            console.log(tax);
            res.json(tax)
        })

    //console.log(tax)
    //res.json( tax );
})

app.get('/incVariables', (req, res) => {
    incomeTaxVariables_model.find()
        .then(variables_li => res.json(variables_li[0]))
        .catch(err => res.json(err))
})


app.put('/incUpdate', (req, res) => {
    const id = "6555baf90a5c355a6f1db3ac"
    incomeTaxVariables_model.findByIdAndUpdate({ _id: id }, {
        maleCondition1: req.body.maleCond1,
        maleCondition2: req.body.maleCond2,
        maleCondition3: req.body.maleCond3,
        maleCondition4: req.body.maleCond4,
        maleCondition5: req.body.maleCond5,
        femaleCondition1: req.body.femaleCond1,
        femaleCondition2: req.body.femaleCond2,
        femaleCondition3: req.body.femaleCond3,
        femaleCondition4: req.body.femaleCond4,
        femaleCondition5: req.body.femaleCond5,
        fighterCondition1: req.body.fighterCond1,
        fighterCondition2: req.body.fighterCond2,
        fighterCondition3: req.body.fighterCond3,
        fighterCondition4: req.body.fighterCond4,
        fighterCondition5: req.body.fighterCond5
    })
        .then(res.json("Updated"))
        .catch(err => res.json(err))
})

app.post('/userQuery', (req,res)=> {
    //console.log(req.body)
    const { u, fullName, topic, message } = req.body;
    const query_json = {
        email : u, 
        fullName : fullName,
        topic : topic, 
        message : message
    };
    //console.log(query_json)
    user_queries_model.create( query_json ) // uploading body given by client to DB
    .then( (user_query) =>  res.json(user_query) )  // responding back the uploaded body to client
    .catch( err => res.json(err) )
})

app.post('/adminMessage', (req,res)=> {
    //console.log(req.body)
    //const { userEmail, adminName, topic, message } = req.body;
    //const query_json = {
    //    email : u, 
    //    fullName : fullName,
    //    topic : topic, 
    //    message : message
    //}; 
    //console.log(query_json)
    admin_messages_model.create( req.body ) // uploading body given by client to DB
    .then( (admin_message) =>  res.json(admin_message) )  // responding back the uploaded body to client
    .catch( err => res.json(err) )
})

app.post('/addCardInformation', (req, res) => {

    card_infos_model.create(req.body)
        .then(info => {
            if (!info) {
                console.log(info)
                return res.status(404).json({ message: 'Info not found' });
            }
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post('/updateCardInformation', (req, res) => {
    const { u, cardName, cardNum, expDate, cvc, zip } = req.body;

    // Create an object to store only non-null and non-empty fields
    const updatedFields = {};

    // Check and update each field
    updatedFields.u = u;
    if (cardName !== null && cardName !== "") {
        updatedFields.cardName = cardName;
    }

    if (cardNum !== null && cardNum !== "") {
        updatedFields.cardNum = cardNum;
    }

    if (expDate !== null && expDate !== "") {
        updatedFields.expDate = expDate;
    }

    if (cvc !== null && cvc !== "") {
        updatedFields.cvc = cvc;
    }

    if (zip !== null && zip !== "") {
        updatedFields.zip = zip;
    }

    card_infos_model.findOneAndUpdate(
        { u: u },
        { $set: updatedFields },
        { new: true }
    )
        .then(info => {
            if (!info) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(info);
        })
        .catch(err => {
            res.json({ message: 'Error occured!', err });
        });
});

app.get("/govTaxInfo", (req, res) => {
    const { u } = req.query; // Use req.query to get parameters from the query string
    //console.log(u)
    gov_tax_infos_model.findOne({ u: u, status:'pending' })
        .then((taxInfo) => {
            //console.log(taxInfo)
            if(taxInfo != null){
                res.json(taxInfo) 
            }
            else{
                res.json("No pending Tax")
            }

        }) 
        .catch(err => res.json(err));
});

app.get("/haveCardInfo", (req, res) => {
    const { u } = req.query; // Use req.query to get parameters from the query string
    //console.log(u)
    card_infos_model.findOne({ u: u })
        .then(cardInfo => res.json(cardInfo))
        .catch(err => res.json(err));
});

app.get("/notificationInfo", (req, res) => {
    const { u } = req.query; // Use req.query to get parameters from the query string
    //console.log(u)
    gov_tax_infos_model.find({ u: u, status:'pending' })
        .then(taxInfo => res.json(taxInfo)) 
        .catch(err => res.json(err));
});

app.post('/calculateRoadTax', (req, res) => {
    const { cc, seatNum } = req.body;   // storing json body elements to variables which is sent by client
    //console.log(cc, seatNum)
    let tax = 0
    if( Number(cc)<=1500 ){
        tax += 25000        
    } else {
        tax += 40000
    }
    tax += (1000*Number(seatNum)) 
    console.log(tax)
    res.json(tax)

});

///////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/calculateLandTax', (req, res) => {
    const { landOrigin, acres, landType } = req.body;

    let val = 0;

    if (landOrigin === "Ka") {
        if (landType === "residential") val = (acres / 100) * 60;
        else if (landType === "commercial") val = (acres / 100) * 300;
        else if (landType === "industrial") val = (acres / 100) * 150;
    } else if (landOrigin === "Kha") {
        if (landType === "residential") val = (acres / 100) * 50;
        else if (landType === "commercial") val = (acres / 100) * 250;
        else if (landType === "industrial") val = (acres / 100) * 150;
    } else if (landOrigin === "Ga") {
        if (landType === "residential") val = (acres / 100) * 40;
        else if (landType === "commercial") val = (acres / 100) * 200;
        else if (landType === "industrial") val = (acres / 100) * 125;
    } else if (landOrigin === "Gha") {
        if (landType === "residential") val = (acres / 100) * 20;
        else if (landType === "commercial") val = (acres / 100) * 100;
        else if (landType === "industrial") val = (acres / 100) * 75;
    } else if (landOrigin === "Umo") {
        if (landType === "residential") val = (acres / 100) * 15;
        else if (landType === "commercial") val = (acres / 100) * 60;
        else if (landType === "industrial") val = (acres / 100) * 40;
    } else if (landOrigin === "Cha") {
        if (landType === "residential") val = (acres / 100) * 10;
        else if (landType === "commercial") val = (acres / 100) * 40;
        else if (landType === "industrial") val = (acres / 100) * 30;
    }

    res.json({ taxValue: val });
});





app.get("/cards/:u", (req, res) => {
    card_infos_model.find({ u: req.params.u })
      .then(cards => res.json(cards))
      .catch(error => res.status(500).json({ error: "Internal Server Error" }));
  });
  
app.get("/taxInfo/:u", (req, res) => {
    gov_tax_infos_model.findOne({ u: req.params.u, status: "pending" })
        .then(taxInfo => {
            if (taxInfo) {
                user_info_model.findOne({ email: req.params.u })
                    .then(user => res.json({ ...taxInfo.toObject(), ...user.toObject() }))
                    .catch(error => res.status(500).json({ error: "Internal Server Error" }));
            } else {
                res.json({});
    }
        })
        .catch(error => res.status(500).json({ error: "Internal Server Error" }));
});
  
  // Update tax status to 'completed'
app.post("/taxInfo/:u", (req, res) => {
    gov_tax_infos_model.findOneAndUpdate({ u: req.params.u, status: "pending" }, { status: "completed" })
        .then(() => res.json({ message: "Tax status updated to completed" }))
        .catch(error => res.status(500).json({ error: "Internal Server Error" }));
});


//app.get("/securityKey/:email", (req, res) => {
//    sec_keys_model.findOne({ email: req.params.email })
//      .then((result) => {
//        res.json(result);
//      })
//      .catch((error) => {
//        console.error("Error fetching security key:", error);
//        res.status(500).json({ error: "Internal Server Error" });
//      });
//  });
  
  // Create a new security key entry or update if exists
//  app.post("/securityKey", (req, res) => {
//    const { email, key } = req.body;
//    sec_keys_model.findOneAndUpdate({ email: email }, { email: email, key: key })
//      .then(() => {
//        res.json({ message: "Security key saved successfully" });
//      })
//      .catch((error) => {
//        console.error("Error saving security key:", error);
//        res.status(500).json({ error: "Internal Server Error" });
//      });
//  });

app.post('/updatePass', (req, res) => {
    const { email, newPass } = req.body;

    // Create an object to store only non-null and non-empty fields
    const updatedFields = {};
    updatedFields.password = newPass

    login_info_users_model.findOneAndUpdate(
        { email: email },
        { $set: updatedFields },
        { new: true }
    )
    .then(user => {
        //if (!user) {
        //    return res.status(404).json({ message: 'User not found' });
        //}
        res.json(user);
    })
    .catch(err => {
        res.json({ message: 'Error occured!', err });
    });            


});


/////////////////////////////////###################################################################
app.post("/sendEmail", (req, res) => {
    const { email, randomKey } = req.body;

    //check if user exists
    login_info_users_model.find({email})
    .then(checkUser => {
        console.log(checkUser)
        if(checkUser.length!==0){
            //sending email
            // app password: mpnl tkyj qfxo vzvj
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'taxCalculatorBd@gmail.com',
                pass: 'mpnl tkyj qfxo vzvj'
            }
            });

            var mailOptions = { 
            from: 'taxCalculatorBd@gmail.com',
            to: email,
            subject: 'Security key for verification on Tax Calculator',
            text: 'Enter the key on website to change password.\n'+'This is your security key for verification: '+ randomKey
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json("error sending mail")
            } else {
                console.log('Email sent: ' + info.response);
                res.json("Key sent to email")
            }
            });   

        } else {
            res.json("user not found")
        }
    })



 
});


// Check security key
app.post("/securityKey", (req, res) => {
    const { email, key } = req.body;
    sec_keys_model.findOne({ email, key })
      .then((existingKey) => {
        if (existingKey) {
          res.json({ message: "Security key saved successfully" });
        } else {
          res.status(401).json({ error: "Incorrect Security Key" });
        }
      })
      .catch((error) => {
        console.error("Error checking security key:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
  
  // Change password
//  app.post("/changePassword/:email", (req, res) => {
//    const { email } = req.params;
//    const { password } = req.body;
  
//    login_info_users_model.findOneAndUpdate({ email: email }, { password: password })
//      .then(() => {
//        res.json({ message: "Password changed successfully" });
//      })
//      .catch((error) => {
//        console.error("Error changing password:", error);
//        res.status(500).json({ error: "Internal Server Error" });
//      });
//  });
  





mongoose.connect("mongodb+srv://TaxCalculator_admin:admin1234@database-api.sassvmz.mongodb.net/TaxCalculator_DB?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log(error)
    })


const port = 5000
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})

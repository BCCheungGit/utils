const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const { default: axios } = require("axios");
const PORT = process.env.PORT || 5001;

var _ = require('lodash');

// Might need to create list of difference services and update the db with event type
//  English, Mando and Canto etc...
// urls = [https://api.planningcenteronline.com/people/v2/lists/1728972/people?offset=0&per_page=500, 
//         https://api.planningcenteronline.com/people/v2/lists/1728972/people?offset=0&per_page=500
//        ]

//  List on Planning Center need to repoint to the last Sunday manaually 
//  The content gets refreshed the same urls below : -
//  Mandarin 8:15am service   : https://api.planningcenteronline.com/people/v2/lists/1728967/people?offset=0&per_page=500&include=households
//  Cantonese 10:00am service : https://api.planningcenteronline.com/people/v2/lists/1755605/people?offset=0&per_page=500&include=households
//  English   10:00am service : https://api.planningcenteronline.com/people/v2/lists/1728972/people?offset=0&per_page=500&include=households
//  Mandarin 11:30am service  : https://api.planningcenteronline.com/people/v2/lists/1755606/people?offset=0&per_page=500&include=households
//  Volunteers                : https://api.planningcenteronline.com/people/v2/lists/1755607/people?offset=0&per_page=500&include=households
//  Child care                : https://api.planningcenteronline.com/people/v2/lists/1755610/people?offset=0&per_page=500&include=households
//  Fellowship                : https://api.planningcenteronline.com/people/v2/lists/1756520/people?offset=0&per_page=500&include=households 

var urls = [];
urls.push({uid:1728967, event_cd:'Mandarin-8:30am'});
urls.push({uid:1755605, event_cd:'Cantonese-10am'});
urls.push({uid:1728972, event_cd:'English-10am'});
urls.push({uid:1755606, event_cd:'Man/Can-11:30am'});
urls.push({uid:1755607, event_cd:'Voluteers'});
urls.push({uid:1755610, event_cd:'Child Care'});
urls.push({uid:1756520, event_cd:'Fellowships'});
//['1728967','1755605','1728972','1755606','1755607','1755610','1756520'];

// middleware
app.use(cors());
app.use(express.json()); // req.body

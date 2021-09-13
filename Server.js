const express = require("express");
const app = express();
const path  = require('path');
const axios = require('axios');
const port = process.argv.slice(2)[0];
app.use( express.urlencoded({extended: true}));
app.use(express.json());
app.use( express.static( __dirname + '/Views' ));
app.get("/", (req, res) => {
    getData();
    res.sendFile( path.join( __dirname, 'Views', 'MainPage.html' ));
});
let countries=[];
let countryData="";
function getData(){
    axios.get('https://restcountries.eu/rest/v2/all')
  .then(res => {
    countries=[];
    const data = res.data;
    for(country of data) {
        countries.push([country.name,country.region]);
    }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
}
app.get("/countries", (req, res) => {
    var data = JSON.stringify(countries);
    res.send(data);
});
app.post("/countryInfo",function(req, res){
    axios.get('https://restcountries.eu/rest/v2/name/'+req.body.country+'?fullText=true')
  .then( res => {
      data= res.data[0];
      console.log(data);
      countryData="country:"+data.name+" capital:"+data.capital+" population:"
      +data.population+" region:"+data.region;
  }).then(function(){
      res.send(JSON.stringify(countryData));
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
});

app.listen(port, () => console.log("listen to port port " + port));
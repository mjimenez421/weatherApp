const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.listen(3001,function(){
    console.log("Server started...");
})

async function getData(){
    const key='00112b7db11165e9f0c7e09f05b2a8e2';
    let res, lat, long;
    try{
        res = await axios.get('https://www.random.org/integers/?num=1&min=-90&max=90&col=1&base=10&format=plain&rnd=new');
        lat = res.data;
    }catch(error){
        return({base: "random"});
    }
    try{
        res = await axios.get('https://www.random.org/integers/?num=1&min=-180&max=180&col=1&base=10&format=plain&rnd=new');
        long = res.data;
    }catch(error){
        return({base: "random"});
    }
    try{
        res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params:{
                lat: lat,
                lon: long,
                appid: key,
                units: "imperial"
            }
        })
    }catch(error){
        return({base: "weather"});
    }
    return(res.data);
}

app.get('/get', (req, res) => {
    getData().then(response => res.send(response));
})



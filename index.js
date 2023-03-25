const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const secret_api=process.env.SECRET_API_KEY;
const port = process.env.PORT || 7000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(secret_api);
    const options = {
        method: 'GET',
        url: 'https://api.browse.ai/v2/robots',
        headers: {Authorization: `Bearer ${secret_api}`}
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        return res.send(body);
      });  
})

app.get('/tasks', (req, res) => {
    const robotId = 'c4fc79d0-5ea5-4078-8dbe-2a3d72ca8515'
    const options = {
        method: 'GET',
        url: `https://api.browse.ai/v2/robots/${robotId}/tasks`,
        qs: {page: '1'},
        headers: {Authorization: `Bearer ${secret_api}`}
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        return res.send(body.toString());
      });
})

app.listen(port, () => console.log(` app listening on port ${port}!`))

/* Added .env  use.secret key*/
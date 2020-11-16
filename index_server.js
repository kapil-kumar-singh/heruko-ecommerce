const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cors());

app.use(express.json())

app.use('/public', express.static(path.join(__dirname, 'upload/product')));
app.use('/api', require('./routes/routes_index'));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('admin-app/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/admin-app/build/index.html'));
    });
  }

const port = process.env.PORT || 9000
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on the port : ${port}`);
} )
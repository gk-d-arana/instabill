const express = require('express');
const app = express();


express.static('public');

//app.get * index.html in dist folder
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})



app.listen(3000 , ()=>{
    console.log('Server is running on port 3000');
})
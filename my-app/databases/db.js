const mongoose = require('mongoose');

function connectToDb(url)
{   
    mongoose.connect(url, {useNewUrlParser: true});

    const connection = mongoose.connection;
    connection.on('error', () => {
        console.log("Error while creating the connection with mongo db")        
    })
}


module.exports =  {connectToDb}
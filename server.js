// Tutorial that helped in setting down the file structure for the backend
// https://www.youtube.com/watch?v=-0exw-9YJBo&ab_channel=TraversyMedia
const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const inventoryRoutes = require('./routes/inventory-routes');
const chatRoomRoutes = require('./routes/chat-room-routes');
const userRoutes = require('./routes/user-routes');
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser');

// setting limit to 50mb to make it easy to upload images in listing 
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

mongoose.connect('mongodb+srv://ishan011:qwerty123@cluster0.1iebh.mongodb.net/bartermates?retryWrites=true',{
    useNewUrlParser: true
},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected with db")
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/chat-room', chatRoomRoutes);
app.use('/api/user', userRoutes);


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 5005;

app.listen(port,()=>{
    console.log("Server started on port !", port)
})
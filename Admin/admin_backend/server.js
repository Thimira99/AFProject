const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./db/dbConnect')

//routes
const adminRoutes = require('./routes/adminRoutes')


//middle wares
app.use(express.json());
app.use(cors());
//app.use("/api/admin",adminRoutes);



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
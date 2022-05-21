require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./db/db')

const studentRoutes =  require('./routes/stdRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/apiRoutes');

//midlewares
app.use(express.json());
app.use(cors());


app.use("/api/student",studentRoutes);
app.use("/api/auth",authRoutes);
app.use("/api", apiRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listning on port ${port}`)
});
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./db/db')
// const uploads = require('./models/uploads')


express.Router()

const studentRoutes =  require('./routes/stdRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/apiRoutes');
const submissionApiRoutes = require("./routes/submissions");

/**file upload*/
const fileUpload = require('express-fileupload')


//midlewares
app.use(express.json());
app.use(cors());


app.use("/api/student",studentRoutes);
app.use("/api/auth",authRoutes);
app.use("/api", apiRoutes)
app.use("/api/student",submissionApiRoutes);

/**file upload */
app.use(fileUpload())
// app.use("/uploads")

app.post('/uploads',(req,res)=>{
    if(req.files === null){
        return res.status(400).json({message:"No file to upload!"}) //${__dirname}/adminfrontend/public/uploads/${file.name}
    }
    const file = req.files.file; //.file renders in the frontend 
    file.mv(`../frontend/src/components/public/uploads/${file.name}`,err =>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName:file.name,filePath:`/uploads/${file.name}`});
    }); //mv-move it
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listning on port ${port}`)
});


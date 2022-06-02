
const registerTopic = require("../models/registerResearchTopic");


/*get reserch topic by superviores with pending */

const getOnereserchbySupervisors = async (req, res) => {

    // const { name, resStatus } = req.body;


    registerTopic.find({ statuss : "Y" }, (err, user) => {
        try {

            if (user) {

                return res.status(200).json({ message: "reserch topic Data fetch", data: user })

            } else {

                return res.status(400).json({ error: "No Data", data: user })
            }




        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }



    });


}



// /*get reserch topic by superviores  without pennding*/

// const getOnereserchbySupervisorsPending = async (req, res) => {

//     const { name} = req.body;


//     registerTopic.find({ supervisor: name}, (err, user) => {
//         try {

//             if (user) {

//                 return res.status(200).json({ message: "reserch topic Data fetch", data: user })

//             } else {

//                 return res.status(400).json({ error: "No Data", data: user })
//             }




//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: "Server Error" });
//         }



//     });


// }


module.exports = {
    getOnereserchbySupervisors,
    // getOnereserchbySupervisorsPending
}
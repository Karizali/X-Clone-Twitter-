import express from "express";
import { tweetModel } from '../dbRepo/Models.mjs';



const router = express.Router()

router.get("/tweets", async (req, res) => {
    const userId = req.body.token._id;
    try {
        let data = await tweetModel.find({ owner: userId });

        res.send({
            message: "got all tweets successfully",
            data: data
        })

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }


});


router.post("/tweet", (req, res) => {
    const body = req.body;
    // console.log("_id "+body.token._id)
    if (!body.tweetText ) {
        res.status(404).send({
            message: "Incomplete data"
        });
        return;
    }

    try {
        tweetModel.create({
            tweetText: body.tweetText,
            owner: body.token._id
        })
        res.send({
            message: "tweet added successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }


});


router.get("/tweet/:id", (req, res) => {
    const id = req.params.id;


    try {
        let data = tweetModel.findOne({ _id: id }).exec();

        if (data) {
            res.send({
                message: `get tweet by id: ${data._id} success`,
                data: data
            });
        } else {
            res.status(404).send({
                message: "tweet not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }

});

router.delete("/tweet/:id", (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const deletedData = tweetModel.deleteOne({ _id: id }).exec();

        if (deletedData.deletedCount !== 0) {
            res.send({
                message: "tweet has been deleted successfully",
            })
        } else {
            res.status(404);
            res.send({
                message: "No tweet found with this id: " + id,
            });
        }

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }



});

router.put("/tweet/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log("sever ", id)
    console.log("sever ", body)
    let tweet;

    if (!body.tweetText) {
        res.status(400).send(` required parameter missing. example request body:
          {
              "tweetText": "value"
          }`)
        return;
    }

    try {
        let data = await tweetModel.findByIdAndUpdate(id,
            {
                tweetText: body.tweetText
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "tweet modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }

});

export default router;
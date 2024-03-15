import express from "express";
import path from "path";
import cors from "cors";
import authApis from './apis/AuthAPI.mjs';
import tweetApis from './apis/tweet.mjs'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { userModel } from "./dbRepo/Models.mjs";


const app = express();
const SECRET = process.env.SECRET || "somesecret";
const port = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', "*"],
  credentials: true
}));






app.use('/api/v1', authApis)


app.use((req, res, next) => {

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request"
    })
    return;
  }
  jwt.verify(req.cookies.Token, SECRET, function (error, decodedData) {
    if (!error) {
      const nowDate = new Date().getTime() / 1000;
      if (decodedData.exp < nowDate) {
        res.cookie('Token', '', {
          maxAge: 1,
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        res.send({ message: "token expired" })
      } else {
        console.log("token approved");
        req.body.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token")
    }
  })

})

const getUserDetails = async (req, res) => {
  let _id;
  if (req.params.id) {
    _id = req.params._id;
  } else {
    _id = req.body.token._id;
  }

  try {
    const user = await userModel.findOne({ _id: _id }, "firstName lastName email -_id").exec();
    if (!user) {
      res.status(404).send({})
      return;
    }
    else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Error in getting user's details",
    });
  }

}

app.use('/api/v1/profile',getUserDetails);

app.use('/api/v1/profile/:id',getUserDetails);

app.use('/api/v1', tweetApis)


const __dirname = path.resolve();

app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { userModel } from '../dbRepo/Models.mjs';




const router = express.Router()
const SECRET = process.env.SECRET || "somesecret";

router.post("/signup", async (req, res) => {
  const body = req.body;

  if (
    !body.firstName ||
    !body.email ||
    !body.password ||
    !body.lastName) {

    res.status(404).send({
      message: "Incomplete data"
    });
    return;
  }


  try {
    const email = body.email.toLowerCase();
    let user = await userModel.findOne({ email: email }).exec();

    if (user) {
      res.status(401)
      res.send({
        message: "Email already exist",
      })
      return;
    }

  } catch (error) {
    res.status(500).send({
      message: "Error in fetching user's data from database"
    })
  }


  const myPlaintextPassword = body.password;
  let hash;

  try {

    const saltRounds = await bcrypt.genSalt()
    console.log(saltRounds)
    hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    console.log(hash);

  } catch (error) {
    console.log(error)
    res.status(404).send({
      message: "Error in hash creation"
    });
  }

  try {
    userModel.create({
      firstName: body.firstName,
      lastName: body.lastName,
      password: hash,
      email: body.email
    })
    res.status(200);
    res.send({
      message: "Signup successfully"
    });
  } catch (error) {
    res.status(500).send({
      message: "Signup Failed"
    })
  }


});

router.post("/login", async (req, res) => {
  const body = req.body;

  if (
    !body.email ||
    !body.password) {

    res.status(404).send({
      message: "Email or password is missing"
    });
    return;
  }

  try {
    const email = body.email.toLowerCase();
    console.log(email)
    let user = await userModel.findOne({ email: email },
      "firstName lastName email password ").exec();

    if (!user) {
      res.status(404)
      res.send({
        message: "User not found",
      })
      return;
    } else {
      console.log(user)
      const match = await bcrypt.compare(body.password, user.password);

      if (match) {

        const token = jwt.sign({
          _id: user._id,
          email: user.email,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, SECRET);

        res.cookie('Token', token, {
          maxAge: 86_400_000,
          httpOnly: true,
          sameSite: 'none',
          secure: true
        });

        res.send({
          message: "login successful",
          profile: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
          }
        });
        return;

      } else {
        res.status(401)
        res.send({
          message: "Password is incorrect"
        })
        return;
      }

    }

  } catch (error) {
    res.status(500).send({
      message: "Error in fetching user's data from database"
    })
  }


});

router.post("/logout", (req, res) => {

  res.cookie('Token', '', {
    maxAge: 1,
    httpOnly: true
  });

  res.send({ message: "Logout successful" });
})


export default router
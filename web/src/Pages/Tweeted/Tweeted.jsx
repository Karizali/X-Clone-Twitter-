import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box, Card, CardActions, CardContent,
  Button, Typography, TextField,
} from '@mui/material';
import './Tweeted.css';
import { useEffect, useState, useContext } from 'react';
import CardMedia from "@mui/material/CardMedia";
import { GlobalContext } from '../../Components/Context/Context';

function Tweeted() {

  const [tweets, setTweets] = useState([]);
  const [editingTweets, setEditingTweets] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  let { state, dispatch } = useContext(GlobalContext);

  const getTweets = async () => {


    try {
      const response = await axios.get(`${state.baseUrl}/api/v1/tweets`);
      setTweets(response.data.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  const editTweet = async (tweet) => {
    console.log(tweet)
    try {
      const response = await axios.put(`${state.baseUrl}/api/v1/tweet/${editingTweets.id}`, {
        id: editingTweets._id,
        tweetText: tweet.editTweetText,
      });
      // setTweets(response.data.data)
      getTweets()
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }
  const deleteTweet = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`${state.baseUrl}/api/v1/tweet/${id}`, {
        text: editingTweets.tweetText,
      });

      // setTweets(response.data.data)
      getTweets()
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    getTweets()
  }, [])

  const formik = useFormik({
    initialValues: {
      tweetText: '',
    },
    validationSchema: Yup.object({
      tweetText: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log(values);

      (async () => {
        try {
          const response = await axios.post(`${state.baseUrl}/api/v1/tweet`, {
            tweetText: values.tweetText,
            owner: state.user._id,
          },
            {
              withCredentials: true,
            });
          getTweets()
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      })()

      formik.resetForm()

    },
  });

  const editformik = useFormik({
    initialValues: {
      editTweetText: ''
    },
    validationSchema: Yup.object({
      editTweetText: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3, 'Must be at least 3 characters')
        .required('Required')
    }),
    onSubmit: (values) => {
      console.log(values);
      console.log(editingTweets)
      editTweet(values)
      setIsEditing(!isEditing)


      editformik.resetForm()

    },
  });

  return (
    <>
    <h1 style={{textAlign:"center"}}>Tweet</h1>
      <Card sx={{ minWidth: 275, maxWidth: 500, margin: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                marginBottom: 2
              }}
            >
              <textarea
                id="tweetText"
                name="tweetText"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tweetText}
                cols="55"
                rows="15"
                fullWidth label="Tweet Text" >What is in your mind</textarea>
              {formik.touched.tweetText && formik.errors.tweetText ? (
                <div className="error">{formik.errors.tweetText}</div>
              ) : null}
            </Box>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small" variant="contained">Tweet</Button>
          </CardActions>
        </form>
      </Card>
      <div>
        {tweets.map((tweet) => (
          <Card key={tweet._id} sx={{ maxWidth: 345, margin: "1rem", cursor: "pointer" }}>
            {(isEditing && editingTweets.id === tweet._id) ?
              <>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  editformik.handleSubmit(tweet)
                }}>
                  <CardContent>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginBottom: 2
                      }}
                    >
                      <textarea
                        id="editTweetText"
                        name="editTweetText"
                        type="text"
                        onChange={editformik.handleChange}
                        onBlur={editformik.handleBlur}
                        value={editformik.values.editTweetText}
                        fullWidth label="Tweet Text"
                        cols="55"
                        rows="15"
                      ></textarea>
                      {editformik.touched.editTweetText && editformik.errors.editTweetText ? (
                        <div className="error">{editformik.errors.editTweetText}</div>
                      ) : null}
                    </Box>

                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" onClick={() => {
                      setIsEditing(!isEditing)
                    }}>Cancel</Button>
                    <Button type="submit" size="small" variant="contained" onClick={() => {


                    }}>Update</Button>
                  </CardActions>
                </form>
              </>
              :
              <>
                <CardMedia sx={{ height: 140 }} image={"https://cdn.dummyjson.com/product-images/2/2.jpg"} title={tweet.tweetText} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      height: "40px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tweet.tweetText}
                  </Typography>

                </CardContent>
                <CardActions>

                  <Button size="small" onClick={() => {
                    deleteTweet(tweet._id)
                    getTweets()
                  }}>Delete</Button>
                  <Button size="small" onClick={() => {
                    setIsEditing(!isEditing)
                    setEditingTweets({
                      id: tweet._id,
                      text: tweet.tweetText
                    })
                    console.log(editingTweets)
                    editformik.setFieldValue("editTweetText", tweet.tweetText)
                  }}>Edits</Button>

                </CardActions>
              </>
            }
          </Card>
        ))}

      </div>
    </>
  );
}

export default Tweeted;

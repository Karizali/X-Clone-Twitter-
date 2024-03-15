import './App.css';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from './Components/Context/Context';
import axios from 'axios';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider, Navigate
} from "react-router-dom";
import {
  Home, LogIn, ProductDetailedPage, Tweeted
  , SignUp,
  ChangePassword,
} from './Pages'
import Layout from './Components/Layout/Layout';
import Loader from './Components/Loader';



function App() {


  let { state, dispatch } = useContext(GlobalContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${state.baseUrl}/api/v1/profile`,
          {
            withCredentials: true,
          });
        console.log(response)
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })

      } catch (error) {
        console.log(error)

        dispatch({
          type: 'USER_LOGOUT'
        })
      }
    })()

  }, [])


  useEffect(() => {

    axios.interceptors.request.use(function (config) {
      config.withCredentials = true;
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  }, [])



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {state.isLogin === true ?
          <>
            <Route path="" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="tweet" element={< Tweeted />} />
              <Route path="product/:productId" element={<ProductDetailedPage />} />
              <Route path="*" element={<Home />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Navigate to={"/"} />} />
          </>
          :
          null
        }
        {state.isLogin === false ?
          <Route path="/" >
            <Route path="" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<LogIn />} />
          </Route>
          :
          null
        }
        {state.isLogin === null ?
          <Route path="*" element={<Loader />} />
          :
          null
        }

      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  );
}

export default App;
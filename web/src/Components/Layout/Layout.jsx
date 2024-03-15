import Header from './../Header';
import Footer from './../Footer';
import { Outlet } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { GlobalContext } from './../Context/Context';
import axios from 'axios';



function Layout() {

  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
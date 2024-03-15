import './Home.css';
import Carousel from '../../Components/Carousel';
import MediaCard from '../../Components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import slider_img_1 from "../../Assets/Images/slider_img_1.jpeg"
import p1 from "../../Assets/Images/p1.png"
import p2 from "../../Assets/Images/p2.png"
import p3 from "../../Assets/Images/p3.png"
import p4 from "../../Assets/Images/p4.png"
import p5 from "../../Assets/Images/p5.png"
import p6 from "../../Assets/Images/p6.png"
import { ColorRing } from 'react-loader-spinner';
import {Tweeted} from './../../Pages';

function Home() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const [allCategories, setAllCategories] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let pics = [p1, p2, p3, p4, p5, p6];
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                
                // To prevent error because this doesn't access Header(withCredential:true)
                const uninterceptedAxiosInstance = axios.create();

                const response = await uninterceptedAxiosInstance.get('https://dummyjson.com/products');
                setData(response.data.products);
                const categories = response.data.products.map(element => element.category)

                const uniqueCategories = Array.from(new Set(categories));
                setAllCategories(prev => [...prev, ...uniqueCategories]);
                console.log(allCategories)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        })();

    }, [])


    return (
        <>
            {(loading) ?
                <div className='loaderDiv'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
                : <div className="">
                    <Tweeted />

                </div>}
        </>
    );
}

export default Home;
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { styled } from '@mui/material/styles';
import './ProductDetailedPage.css';
import Carousel from '../../Components/Carousel';
import ContactBox from "../../Components/ContactBox"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import slider_img_2 from "../../Assets/Images/slider_img_2.png"
import { useParams } from 'react-router-dom';


const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));
const DemoPaper2 = styled(Paper)(({ theme }) => ({
    width: "100%",
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

function ProductDetailedPage() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    var images = [
        {
            img: slider_img_2
        },
        {
            img: slider_img_2
        },

    ]
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let { productId } = useParams();
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://dummyjson.com/products/${productId}`);
                setData(response.data);

                // console.log(data)
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

                :
                <>
                    <Carousel height={"100px"} width={"75%"} images={images} api={false} />
                    <div className='profileCarousel'>
                        <div className='carousel'>
                            <Carousel height={"400px"} width={"100%"} images={data.images} api={true} />
                        </div>
                        <div>
                            <ContactBox />
                            <div className='ratingBrandContainer'>
                                <Stack direction="row" spacing={2} >
                                    <DemoPaper square={false} sx={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                        <div className='ratingBrandBox'>
                                            <div>
                                                <h1>Rating</h1>
                                                <div className='center'>
                                                    <StarBorderIcon /> <span> {data.rating}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Brand</h1>
                                                <div>
                                                    <span>{data.brand}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </DemoPaper>
                                </Stack>
                            </div>
                        </div>
                    </div>
                    <div className='width100'>
                        <Stack direction="row" spacing={2} sx={{ margin: "3rem 0 3rem 3rem" }}>
                            <DemoPaper2 square={false} sx={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                <div className='priceDiscountContainer'>
                                    <div className='priceBox'>
                                        <h1>Rs. {data.price}</h1>
                                        <div className=''>
                                            <ShareOutlinedIcon sx={{ marginRight: "0.5rem" }} /><FavoriteBorderIcon />
                                        </div>
                                    </div>
                                    <div className='discountBox'>
                                        <div>
                                            <h3>Discount</h3>
                                            <span>{data.discountPercentage} %</span>
                                        </div>
                                        <div className='stock'>
                                            <h3>Stock </h3>
                                            <span>: {data.stock}</span>
                                        </div>
                                    </div>
                                </div>
                            </DemoPaper2>
                        </Stack>
                    </div>
                    <div className='width100'>
                        <Stack direction="row" spacing={2} sx={{ margin: "3rem 0 3rem 3rem" }}>
                            <DemoPaper2 square={false} sx={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                                <div className='priceDiscountContainer'>
                                    <div className=''>
                                        <h1>Description</h1>
                                        <div className=''>
                                            {data.description}
                                        </div>
                                    </div>

                                </div>
                            </DemoPaper2>
                        </Stack>
                    </div>
                </>
            }
        </>
    )

}

export default ProductDetailedPage;
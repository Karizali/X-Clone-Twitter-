import React from 'react';
import './Carousel.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
// import slider_img2 from "../../assets/images/slider_img2.jpg"
// import slider_img3 from "../../assets/images/slider_img3.jpg"

function Carousel1({ height, width,images,api }) {
    

    return (
        <div className='carouselContainer'>
                <Carousel sx={{ height: { height }, width: { width } }} >
                    {
                        images?.map((item, i) => <Item sx={{ borderRadius: "5px", }} height={ height } width={width} key={i} item={item} api={api}/>)
                    }
                </Carousel> 
        </div >
    )
}

function Item({width, height,item,api}) {
    return (
        <Paper sx={{display:"flex", justifyContent:"center"}}>
            {(api)?<img className='h-1/2' width={width} height={height} src={item} alt="" srcset="" />:<img className='h-1/2' width={width} height={height} src={item.img} alt="" srcset="" />}
        </Paper>
    )
}
export default Carousel1;
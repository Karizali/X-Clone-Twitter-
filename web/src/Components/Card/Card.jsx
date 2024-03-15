import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({image,price,descrip,title}) {
  return (
    <Card sx={{ maxWidth: 345, margin:"1rem", cursor:"pointer"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ height:"40px",whiteSpace:"nowrap" ,overflow:"hidden" ,  textOverflow: "ellipsis" }}>
           {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Rs. {price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height:"60px",whiteSpace:"nowrap" ,overflow:"hidden" ,  textOverflow: "ellipsis" }}>
          {descrip}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

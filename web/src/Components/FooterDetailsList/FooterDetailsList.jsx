import * as React from 'react';
import "./FooterDetailsList.css"

function FooterDetailsList({title,listArray}) {
    return (
      <div>
      <div className='footerListTitle'>{title}</div>
      {listArray.map((element,index)=>{
        return(
          <div  className='footerList'>
           <li>{element}</li> 
          </div>
        )
      })}
      </div>
    );
  }
  
  export default FooterDetailsList;
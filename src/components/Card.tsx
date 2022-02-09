import React, { FC } from 'react';
import styled from 'styled-components';
interface ImagePath{
    path : string;
    title:string;
    content:string
}
export const Card:FC<ImagePath> = ({path , title , content}) => {
  return <CardContainer image={path} color="red">
      <div className="overlay"></div>

      <div className="content">

        <div className="content-title">
{title}    </div>
        <div className="content-para">
{content}        </div>
      </div>
  </CardContainer>;
};


const CardContainer = styled.div<{image:string , color:string}>`
height : 300px;
background:red;
margin: 25px 0;
position:relative;
min-width:45%;  
background-size: cover;
background-repeat: no-repeat;
background-position:center;
background-image: url(${props => props.image});
border-radius:10px;
overflow:hidden;
.content{
    position:absolute;
    z-index:99;
    bottom: 20px;
    left:20px;
    color:white;
}
.overlay{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:rgb(61, 116, 54);
    opacity:0.5;
    mix-blend-mode:multiply	;

}
`

import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react'
export const SearchComp = () => {
  return <SearchContiner>
        <div className="title">
            ابحث عن سورة
        </div>
        
        <img src="qn.png" className="search-img" />

        <form className="search-form">
        <input type="text" className='search-input' placeholder='اسم السورة'/>
        <button><i className='fa fa-search' ></i></button>
        </form>
      
  </SearchContiner>;
};

const SearchContiner = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    justify-content:center;
    align-items:center;
    min-height:350px;
    direction: rtl;

    .search-img{
        width: 40%;
        margin:20px 0;
    }

    .search-form{
        display:flex;
        justify-content:center;
        .search-input{
            outline:none;
            padding:5px;
            border:none;
            background:rgba(61, 116, 54, 0.124);

        }
        button{
            outline:none;
            border:none;
            padding:7px 15px;
            background:rgba(86, 167, 75, 0.823);
            color:white;

        }
    }
`

import React from "react";
import styled from "styled-components";
import BlogCard from "../components/BlogCard";
import { colors, sizes } from "../constant";

const Blog = () => {
  return (
    <>
      <BlogCat>
        <div className="cat--title">الأقسام :</div>
        <div className="cat-container">
          <div className="cat">السنة النبوية</div>
        </div>
      </BlogCat>{" "}
      <BlogCards>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </BlogCards>
    </>
  );
};

const BlogCat = styled.div`
  min-height: 100px;
  direction: rtl;
  .cat--title {
    margin: 0 0 30px;
    font-size: ${sizes.big};
  }
  margin-top: 70px;
  .cat-container {
    display: flex;
    justify-content: flex-start;
    direction: rtl;
    flex-wrap: wrap;
    .cat {
      padding: 2px 5px;
      border: 2px solid ${colors.main};
      font-size: ${sizes.normal};
      border-radius: 6px;
      margin: 2px 2px 5px 10px;
      color: white;
      background-color: ${colors.main};

      cursor: pointer;
      &:hover {
        color: initial;
        background: white;
      }
    }
  }
`;

const BlogCards = styled.div`
  display: flex;

  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-end;
  &:nth-last-child(2) + &:nth-of-type(4n + 4) {
    background-color: #f1b73e;
    margin-right: 0;
  }
`;

export default Blog;

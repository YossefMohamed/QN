import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BlogCard from "../components/BlogCard";
import { Loader } from "../components/Loader";
import { colors, sizes } from "../constant";
import { getPosts } from "../store/postSlice";
import { Rootstate } from "../store/store";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { posts, loading, error, totalPages } = useSelector(
    (state: Rootstate) => state.post
  );
  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get("page")) || 0
  );
  React.useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 0);
  }, [searchParams.get("page")]);
  React.useEffect(() => {
    dispatch(getPosts({ page: currentPage }));
  }, [currentPage, dispatch]);

  return (
    <>
      <BlogCat>
        <div className="cat--write mt-5" onClick={() => navigate("/blog/add")}>
          أكتب موضوع <i className="fas fa-edit	icon--write"></i>
        </div>
      </BlogCat>{" "}
      {loading ? (
        <Loader />
      ) : (
        <BlogCards>
          {!posts.length ? <h1>لا يوجد مواضيع....</h1> : ""}
          {posts.map((post, idx) => (
            <BlogCard
              key={idx}
              title={post.title}
              content={post.content}
              category={post.category}
              author={post.author.name}
              postID={post.id}
              image={post.image}
            />
          ))}
        </BlogCards>
      )}
      <PageButtons className="page--buttons">
        <button
          className={`back ${currentPage <= 0 && "disabled"}`}
          disabled={currentPage <= 0}
          onClick={() => {
            !(currentPage <= 0) && navigate(`/blog?page=${currentPage - 1}`);
          }}
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages - 1}
          className={`next ${currentPage === totalPages - 1 && "disabled"}`}
          onClick={() => {
            !(currentPage === totalPages - 1) &&
              navigate(`/blog?page=${currentPage + 1}`);
          }}
        >
          Next
        </button>
      </PageButtons>
    </>
  );
};

const PageButtons = styled.div`
  display: flex;
  justify-content: center;
  .disabled {
    opacity: 0.7;
  }
  button {
    background-color: ${colors.main};
    padding: 5px 15px;
    margin: 10px;
    color: white;
    font-size: ${sizes.small};
    width: fit-content;
    text-align: center;
    outline: 0;
    border: 0;
    border: 1px solid ${colors.main};

    &:hover {
      background-color: white;
      color: ${colors.main};
    }
  }
`;
const BlogCat = styled.div`
  min-height: 100px;
  .cat--write {
    display: flex;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 5px;
    &:hover {
      background-color: ${colors.main};
      color: white;
    }
    cursor: pointer;
    align-items: center;
    .icon--write {
      margin-right: 10px;
      color: ${colors.main};
    }
  }
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

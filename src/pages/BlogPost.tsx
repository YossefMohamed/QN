import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { Comment } from "../components/Comment";
import ReactMarkdown from "react-markdown";
import { CustomModel } from "../components/CustomModel";
import { Titlehadith } from "../components/styled-components/homePage";
import { sizes, colors } from "../constant";
import { deletePost, getPost, likePost } from "../store/postSlice";
import { Rootstate } from "../store/store";
import { Loader } from "../components/Loader";
import moment from "moment";
import "moment/locale/ar";

const BlogPost = () => {
  const [display, setDisplay] = React.useState(false);
  const dispatch = useDispatch();
  moment.locale("ar");
  const params = useParams();
  const { post, loading, error, liked } = useSelector(
    (state: Rootstate) => state.post
  );

  const auth = useSelector((state: Rootstate) => state.auth);
  React.useEffect(() => {
    dispatch(getPost({ post: params.id }));
  }, [params.id]);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <CustomModel
            message="هل انت متاكد من أزالة المقال؟"
            appear={display}
            setDisplay={setDisplay}
            action={() => {
              dispatch(deletePost({ post: post.id }));
              navigate("/blog");
            }}
          />
          <Titlehadith onClick={() => navigate("/blog")}>
            <span style={{cursor : "pointer"}}>
            الرجوع
            </span>
             </Titlehadith>
          <div className="articale">
            <div className="articale--data">
              <div className="title">{post.title}</div>
              <div className="date">{moment(post.createdAt).fromNow()}</div>
            </div>
            <div className="articale--img">
              <img
                src={post.image ? post.image : "/k3ba.jpg"}
                alt="articale"
                loading="lazy"
              />
            </div>

            <div className="articale--content">
              {auth.user?._id && (
                <div className="controll--post">
                  {liked ? (
                    <span className="loading">
                      <i className="fa fa-spinner"></i>
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        auth.user._id && dispatch(likePost({ post: post.id }));
                      }}
                    >
                      <i
                        className="fa-solid fa-heart"
                        style={{
                          color: `${
                            post.likes.filter(
                              (id: string) => id === auth.user._id
                            ).length
                              ? "red"
                              : ""
                          }`,
                        }}
                      ></i>
                      {post.likes && post.likes.length}
                    </span>
                  )}
                  {(auth.user._id ===post.author?._id)  && (
                    <>
                      <span>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => setDisplay(true)}
                        ></i>
                      </span>
                      <span>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() =>
                            navigate("/blog/" + params.id + "/edit")
                          }
                        ></i>
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className="entry-content clearfix single-post-content">
                <ReactMarkdown children={post.content} />
              </div>
            </div>
            {post.comments && <Comment post={post} />}
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  .loading {
    animation: mymove 0.5s infinite;
  }
  @keyframes mymove {
    50% {
      transform: rotate(180deg);
    }
  }
  .articale {
    direction: rtl;
    &--data {
      .title {
        font-size: calc(${sizes.big} + 10px);
        font-weight: bold;
      }
      .date {
        margin: 20px 0;
        font-family: inherit;
      }
    }
    &--img {
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100%;
        height: 400px;
      }
    }

    &--content {
      padding: 0 5%;
      margin: auto;
      line-height: 200%;
    }
  }
  .single-post-content {
    margin: 50px 0;
  }
  .controll--post {
    display: flex;
    margin: 50px 0;
    justify-content: space-around;
    span {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        margin: 0 15px;
      }
      &:hover {
        color: ${colors.main};
      }
    }
  }
`;
export default BlogPost;

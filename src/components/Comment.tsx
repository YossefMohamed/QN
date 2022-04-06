import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { colors, sizes } from "../constant";
import { getComments, addComment, deleteComment } from "../store/commentSlice";
import { Rootstate } from "../store/store";
import { Loader } from "./Loader";

import moment from "moment";
import "moment/locale/ar";
import { CustomModel } from "./CustomModel";
export const Comment: React.FC<{
  post: any;
}> = (props: any) => {
  moment.locale("ar");

  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      getComments({
        post: props.post.id,
      })
    );
  }, []);
  const comments = useSelector((state: Rootstate) => state.comments);
  const { user } = useSelector((state: Rootstate) => state.auth);
  const [display, setDisplay] = React.useState(false);
  const [deletedComment, setDeletedComment] = React.useState("");

  return (
    <Container>
      <CustomModel
        message="هل انت متأكد من أزالة التعليق؟"
        appear={display}
        setDisplay={setDisplay}
        action={() => {
          setDisplay(false);
          dispatch(
            deleteComment({
              post: props.post.id,
              comment: deletedComment,
            })
          );
        }}
      />
      {comments.comments.length ? (
        <h1>{comments.comments.length} كومنتات متاحة</h1>
      ) : (
        <h1>لا يوجد كومنتات</h1>
      )}
      <div className="well">
        <div className="form-group">
          <textarea
            className="form-control"
            value={content}
            rows={4}
            placeholder={
              user._id
                ? "أكتب تعليقك...."
                : "يرجي تسجيل الدخول من أجل مشاركة تعليقك"
            }
            onChange={(e: any) => setContent(e.target.value)}
            disabled={!user._id}
          ></textarea>
        </div>
        <div className="submit">
          <button
            type="submit"
            name="say"
            value=""
            className="btn btn-submit "
            disabled={!content}
            onClick={() => {
              dispatch(
                addComment({
                  post: props.post.id,
                  content,
                })
              );
              setContent("");
            }}
          >
            <i className="fa fa-reply"></i> أرسال
          </button>
        </div>
      </div>
      {comments.loading ? (
        <Loader />
      ) : (
        <>
          {comments.comments.map((com: any, idx: number) => (
            <div className="commentSection" key={idx}>
              <div className="comment">
                <div className="avatar">
                  <img
                    src={`https://avatars.dicebear.com/api/initials/${com.author.name}.svg`}
                    alt="awd"
                  />
                </div>
                <div className="content">
                  <div className="header">
                    <div className="name">{com.author.name}</div>
                    <div className="date">
                      {moment(com.createdAt).locale("ar").fromNow()}
                    </div>
                  </div>
                  <div className="content--comment">
                    {com.content}
                    {user.id === com.author.id && (
                      <span
                        onClick={() => {
                          setDeletedComment(com._id);
                          setDisplay(true);
                        }}
                        style={{ padding: "0px 5px", cursor: "pointer" }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  textarea {
    resize: none;
    font-size: ${sizes.normal};
  }
  .commentSection {
    margin: 30px 0;

    border-bottom: 1px solid rgb(73, 73, 73);
    padding: 30px 0;
  }
  .well {
    padding: 20px 0;
  }
  .submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .btn-submit {
      background-color: ${colors.main};
      color: white;
      padding: 5px 15px;
    }
  }
  padding: 2%;
  direction: rtl;
  .comment {
    display: flex;
    .avatar {
      width: fit-content;
      margin-left: 10px;
      overflow: hidden;
      display: flex;

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 5px;
      border: 1px solid ${colors.main};
      padding: 0;
      overflow: hidden;
      .date {
        font-size: ${sizes.small};
      }
    }
    .header {
      color: #38383898;
      background-color: ${colors.main};
      color: white;
      margin-bottom: 15px;
      padding: 10px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
  .content--comment {
    padding: 10px;
  }
`;

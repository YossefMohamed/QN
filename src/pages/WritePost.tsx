import React, { useEffect } from "react";
import { colors, sizes } from "../constant";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  editPost,
  getPost,
  removePost,
  resetEdit,
} from "../store/postSlice";
import { Rootstate } from "../store/store";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export const WritePost: React.FC<{ edit?: boolean }> = ({ edit = false }) => {
  const post = useSelector((state: Rootstate) => state.post);
  const [title, setTitle] = React.useState(edit ? post.post.title : "");
  const [body, setBody] = React.useState(edit ? post.post.content : "");
  const [image, setImage] = React.useState<any>("");
  const [error, setError] = React.useState("");
  const fileUpload = React.useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const auth = useSelector((state: Rootstate) => state.auth);

  useEffect(() => {
    if (!Object.values(auth.user).length) {
      navigate("/signin");
    }
  }, [auth, dispatch, navigate]);
  const onSubmit = () => {
    if (!edit) {
      if (!title || !body || !image) {
        return setError("أملاء كل البيانات ");
      } else {
        setError("");
      }
    } else {
      if (!title || !body) {
        return setError("أملاء كل البيانات ");
      } else {
        setError("");
      }
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", body);
    formData.append("title", title);
    formData.append("category", "السنة النبوية");
    !edit && dispatch(addPost(formData));
    edit &&
      dispatch(
        editPost({
          body,
          title,
          image: image,
          post: post.post.id,
        })
      );
    navigate("/blog");
  };
  React.useLayoutEffect(() => {
    !params.id
      ? dispatch(removePost())
      : dispatch(getPost({ post: params.id }));
    dispatch(resetEdit());
  }, []);
  // useEffect(() => {
  //   !edit && Object.keys(post.post).length && navigate("/blog/" + post.post.id);
  //   edit && setTitle(post.post.title);
  //   edit && setBody(post.post.content);
  //   post.edited && navigate("/blog/" + post.post.id);
  // }, [post]);
  return (
    <Container>
      {post.loading ? (
        <Loader />
      ) : (
        <>
          <div className="title">
            <div className="write--title">
              <h2>أكتب عنوان الموضوع :</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text--input"
                placeholder="أكتب عنوان للموضوع"
              />
            </div>
          </div>
          <div className="img--upload">
            <h2>أختار الصورة لرفعها :</h2>
            <input
              type="file"
              className="inputfile"
              id="embedpollfileinput"
              onChange={(e: any) => setImage(e.target.files[0])}
              ref={fileUpload}
            />
            <button
              className="img--upload__button"
              onClick={() => fileUpload.current.click()}
            >
              أرفع الصورة
              {!image.name ? (
                <i className="fa-solid fa-upload"></i>
              ) : (
                <i className="fa fa-check" aria-hidden="true"></i>
              )}
            </button>
          </div>
          <h2>أكتب الموصوع :</h2>
          <div className="text--md--instructions">
            <div dir="rtl">
              يمكنك كتابة العنوان الأساسى فى الصفحات (header 1) عن طريق وضع رمز
              الشباك قبل العنوان كالتالى:
            </div>
            <blockquote className="tr_bq"># عنوان 1</blockquote>
            <div dir="rtl">ويمكنك كتابة باقى العناوين كالتالى:</div>

            <blockquote className="tr_bq">
              ## عنوان 2<br />
              ### عنوان 3<br />
              #### عنوان 4<br />
              ##### عنوان 5<br />
              ###### عنوان 6
            </blockquote>
          </div>
          <div className="text--editor">
            <textarea
              rows={20}
              placeholder="أكتب الموضوع...."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          {error && (
            <div className="ui negative message error-message">{error}</div>
          )}
          <h2>
            <button className="img--upload__button" onClick={onSubmit}>
              تأكيد الموضوع
            </button>
          </h2>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  .tr_bq {
    padding: 0.6rem;
    margin: 20px 0;
    direction: rtl;
    background: #eee;
    border-radius: 0.4rem;
    font-size: ${sizes.normal};
  }
  .text--editor {
    direction: ltr;
    textarea {
      width: 100%;
      border: 2px solid rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      resize: none;
      padding: 40px 10px;
      font-size: ${sizes.normal};
      font-family: inherit;
      direction: rtl;
      outline: 0;
      &:focus {
        border: 2px solid rgba(0, 0, 0, 0.05);
      }
    }
  }
  .inputfile {
    display: none;
  }

  direction: rtl;
  .text--input {
    border-radius: 5px;
    font-family: inherit;
    font-size: ${sizes.normal};
    width: 100%;
    outline: none;
    border: 0;
    border: 2px solid rgba(0, 0, 0, 0.05);
    padding: 10px;
  }
  h2 {
    margin: 50px 0 20px;
  }
  .img--input {
    border: 0;
    outline: 0;
  }
  .img--upload__button {
    font-family: inherit;
    outline: 0;
    border: 0;
    background-color: ${colors.main};
    padding: 10px 10px;
    color: white;
    border-radius: 5px;
    font-size: ${sizes.normal};
  }
`;

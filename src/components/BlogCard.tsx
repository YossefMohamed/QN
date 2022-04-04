import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors, sizes } from "../constant";
import removeMarkdown from "markdown-to-text";

interface IBlogCard {
  title: String;
  content: string;
  category: string;
  author: string;
  postID: string;
  image?: string;
}

const BlogCard: React.FC<IBlogCard> = ({
  title,
  content,
  category,
  author,
  postID,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <BlogCardContainer>
      <div className="card_image">
        <img src={image ? image : "nabawy.jpg"} alt="as" loading="lazy" />
      </div>
      <div className="card_content">
        <div className="title" onClick={() => navigate("/blog/" + postID)}>
          {title}
        </div>
        <div className="description">{removeMarkdown(content.slice(0, 100) + "....").replaceAll("#", "").replaceAll("]", "")
        .replaceAll("-", " ").replaceAll("(", "")
        .replaceAll(")", "").replaceAll("[", "")}</div>
        <div className="author">{author}</div>
      </div>
    </BlogCardContainer>
  );
};

const BlogCardContainer = styled.div`
  width: 31%;
  border-radius: 6px;
  overflow: hidden;
  min-height: 500px;
  margin: 30px 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);

  .card_image {
    width: 100%;
    height: 45%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .card_content {
    direction: rtl;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .cat-container {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .cat {
      cursor: pointer;
      font-size: calc(${sizes.small} - 2px);
      width: fit-content;
      padding: 0 10px;
      border-radius: 6px;
      margin: 0px 0 0px 2px;
      border: 2px solid ${colors.main};
      color: white;

      background-color: ${colors.main};
      &:hover {
        color: initial;

        background: white;
      }
    }
    .title {
      font-size: calc(${sizes.normal} + 0px);
      font-weight: bold;
      cursor: pointer;
      margin: 20px 0;
    }
    .description {
      font-size: ${sizes.small};
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      flex: 1;
    }
    .author {
      direction: ltr;
      font-size: calc(${sizes.normal} - 2px);
    }
  }
  @media (max-width: 1027px) {
    width: 40%;
    margin: 30px 5%;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 30px 5%;
  }
`;
export default BlogCard;

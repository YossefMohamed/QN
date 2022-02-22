import styled from "styled-components";
import { colors, sizes } from "../constant";

export const ForgetPassword = () => {
  return (
    <FormContainer>
      <h4>تسجيل</h4>
      <div className="form-group">
        <label>البريد</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        تأكيد
      </button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  direction: rtl;
  width: 60%;
  margin: 150px auto;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  label {
    margin: 5px 0;
  }
  input {
    margin: 20px 0;
  }
  h4 {
    text-align: center;
  }
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  padding: 20px;
  border-radius: 10px;
  .btn-block {
    background: ${colors.main};
    border: 1px solid ${colors.main};
    &:hover {
      background: #fff;
      color: ${colors.main};
      border: 2px solid ${colors.main};
    }
  }
  .forgot-password {
    font-size: ${sizes.small};
    color: rgba(0, 0, 0, 0.5);
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

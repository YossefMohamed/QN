import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, sizes } from "../constant";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/authSlice";
import { Rootstate } from "../store/store";
import { useEffect } from "react";
export const Signin = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("الايميل خطأ ...").required("أدخل الايميل"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب ان تكون أكثر من 8 حروف")
      .max(100)
      .required("أدخل الباسورد"),
  });
  const auth = useSelector((state: Rootstate) => state.auth);
  const dispatch = useDispatch();
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,
    isValid,
  } = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (): void => {
      dispatch(
        signin({
          email: values.email,
          password: values.password,
        })
      );
    },
    validationSchema: validationSchema,
  });
  const navigate = useNavigate();
  useEffect(() => {
    Object.values(auth.user).length && navigate("/");
  }, [auth, navigate]);

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <h3>تسجيل دخول</h3>
        {auth.error && (
          <div className="ui negative message error-message">{auth.error}</div>
        )}
        <div className="form-group">
          <label>البريد</label>
          <input
            type="email"
            className="form-control"
            placeholder="أدخل البريد....."
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email ? (
            <div className="ui negative message error-message">
              {errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <label>كلمة السر</label>
          <input
            type="password"
            className="form-control"
            placeholder="أدخل كلمة السر ....."
            onChange={handleChange}
            name="password"
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password ? (
            <div className="ui negative message error-message">
              {errors.password}
            </div>
          ) : null}
        </div>
        <p className="forgot-password text-right">
          نسيت{" "}
          <span>
            <Link to="/forget-password">كلمة السر؟</Link>
          </span>
        </p>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!isValid || auth.loading}
        >
          دخول
        </button>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.form`
  .error-message {
    font-size: ${sizes.small}!important;
    padding: 10px 5px !important;
  }
  direction: rtl;
  width: 60%;
  margin: 60px auto;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  label {
    margin: 5px 0;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
  h3 {
    text-align: center;
    font-family: "El Messiri", sans-serif;
  }
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  padding: 20px;
  border-radius: 10px;
  .btn-block {
    background: ${colors.main};
    font-family: "El Messiri", sans-serif;
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
`;

import { colors, sizes } from "../constant";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import { signup } from "../store/authSlice";
export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: Rootstate) => state.auth);

  useEffect(() => {
    Object.values(auth.user).length && navigate("/");
  }, [auth, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email("الايميل خطأ ...").required("أدخل الايميل"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب ان تكون أكثر من 8 حروف")
      .max(100)
      .required("أدخل الباسورد"),
    firstName: Yup.string()
      .min(2, "ألاسم يجب ان يكون حرفان او أكبر")
      .required("من فضلك أدخل الاسم الاول"),
    lastName: Yup.string()
      .min(2, "ألاسم يجب ان يكونحرفان او أكبر")
      .required("من فضلك أدخل الاسم الثاني"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "يجب ان تكون مثل كلمة المرور")
      .required(),
    gander: Yup.string().required(),
  });

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
    firstName: string;
    lastName: string;
    confirmPassword: string;
    password: string;
    gander: string;
  }>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      gander: "",
      password: "",
    },

    onSubmit: (): void => {
      dispatch(signup(values));
    },
    validationSchema: validationSchema,
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h1>تسجيل</h1>
      {auth.error && (
        <div className="ui negative message error-message">{auth.error}</div>
      )}
      <div className="form-group">
        <label>الأسم الاول </label>
        <input
          type="text"
          className="form-control"
          placeholder="أدخل الأسم...."
          onChange={handleChange}
          name="firstName"
          onBlur={handleBlur}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName ? (
          <div className="ui negative message error-message">
            {errors.firstName}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>الأسم الثاني </label>
        <input
          type="text"
          className="form-control"
          placeholder="أدخل الأسم...."
          onChange={handleChange}
          name="lastName"
          onBlur={handleBlur}
          value={values.lastName}
        />
        {touched.lastName && errors.lastName ? (
          <div className="ui negative message error-message">
            {errors.lastName}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>البريد</label>
        <input
          type="email"
          className="form-control"
          placeholder="أدخل البريد...."
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
      </div>{" "}
      <div className="form-group">
        <label>النوع</label>
        <select
          className="select--input"
          name="gander"
          value={values.gander}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" label="أختار النوع" />

          <option value="male" label="ذكر" />
          <option value="female" label="أنثي" />
        </select>
        {touched.email && errors.email ? (
          <div className="ui negative message error-message">
            {errors.gander}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>كلمة السر</label>
        <input
          type="password"
          className="form-control"
          placeholder="أدخل كلمة السر...."
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
      <div className="form-group">
        <label>نأكيد كلمة السر </label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange}
          name="confirmPassword"
          onBlur={handleBlur}
          value={values.confirmPassword}
          placeholder="تأكيد كلمة السر...."
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <div className="ui negative message error-message">
            {errors.confirmPassword}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="btn submit-btn btn-primary btn-block"
        disabled={!isValid || auth.loading}
      >
        {auth.loading ? "جاري التحميل" : "تسجيل"}
      </button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  .select--input {
    display: block;
    width: 100%;
    border: 1px solid ${colors.main};
    padding: 5px 0;
    border-radius: 5px;
    outline: none;
    font-size: ${sizes.normal};
  }
  .error-message {
    font-size: ${sizes.small}!important;
    padding: 10px 5px !important;
  }
  direction: rtl;
  width: 60%;
  margin: 40px auto;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  label {
    margin: 5px 0;
  }
  h1 {
    padding: 0;
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
    font-size: ${sizes.normal};
    margin-top: 20px;
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

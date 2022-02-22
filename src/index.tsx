import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { Surah } from "./pages/Surah";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { PrayTime } from "./pages/PrayTime";
import Sunnah from "./pages/Sunnah";
import { SunnahBooks } from "./pages/SunnahBooks";
import Surahs from "./pages/Surahs";
import { Azkary } from "./pages/Azkary";
import AzkaryPage from "./pages/AzkaryPage";
import { Search } from "./pages/Search";
import Tzkar from "./pages/Tzkar";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { ForgetPassword } from "./pages/ForgetPassword";
import { NewPassword } from "./pages/NewPassword";
import styled from "styled-components";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import Blog from "./pages/Blog";
import { Profile } from "./pages/Profile";
import { getMe } from "./store/authSlice";
import AyahFav from "./pages/AyahFav";
export const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className=" d-flex justify-content-center">
      <Container className=" p-3 ">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prayertime" element={<PrayTime />} />
            <Route path="/sunnah" element={<Sunnah />} />
            <Route path="/surah" element={<Surahs />} />
            <Route path="/sunnah/:id" element={<SunnahBooks />} />
            <Route path="/azkary" element={<Azkary />} />
            <Route path="/azkary/:id" element={<AzkaryPage />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="/remember-us" element={<Tzkar />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/new-password/:id" element={<NewPassword />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite-ayahs" element={<AyahFav />} />
            <Route path="/surah/:id" element={<Surah />} />
            <Route path="*" element={<h1>no routes00</h1>} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Container>
    </div>
  );
};
const Container = styled.div`
  width: 75%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector("#root")
);

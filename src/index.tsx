import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { Surah } from "./pages/Surah";
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
import { Provider } from "react-redux";
import { store } from "./store/store";
import Blog from "./pages/Blog";
import { Profile } from "./pages/Profile";
import AyahFav from "./pages/AyahFav";
import BlogPost from "./pages/BlogPost";
import { WritePost } from "./pages/WritePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTop from "./utils/ScrollTop";
import { data } from "./utils/not";
export const Root = () => {
  React.useEffect(() => {
    let timeOut: any;
    function notifyForThisMinute() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        var notification = new Notification("لا تنسي ذكر الله", {
          body: data.hadiths[new Date().getMinutes() - 1].arab,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            var notification = new Notification("لا تنسي ذكر الله", {
              body: data.hadiths[new Date().getMinutes() - 1].arab,
            });
          }
        });
      }

      timeOut = setTimeout(notifyForThisMinute, 60000);
    }
    notifyForThisMinute();
    return clearTimeout(timeOut);
  }, []);
  return (
    <div className=" d-flex justify-content-center">
      <Container className=" p-lg-3 p-1">
        <BrowserRouter>
          <Navbar />
          <ScrollTop>
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
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route
                path="/blog/:id/edit"
                element={<WritePost edit={true} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorite-ayahs" element={<AyahFav />} />
              <Route path="/surah/:id" element={<Surah />} />
              <Route path="/blog/add" element={<WritePost />} />
              <Route path="*" element={<h1>Error 404 not Found !!</h1>} />
            </Routes>
          </ScrollTop>
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

import "./landingPage.scss";
import mainPic from "@assets/imgs/main.png";
import subPic from "@assets/imgs/slogn_word_icon_@2x.png";
import nextStepPic from "@assets/imgs/next_step_icon_@2x.png";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../assets/ts/constants";
export default function LandingPage() {
  // 处理页面进入动画相关的逻辑
  const pageElemRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    pageElemRef.current.style.opacity = "1";
  }, []);

  // 处理跳转登录页面相关的逻辑
  const navigate = useNavigate();
  const toLogin = useCallback(() => {
    navigate(LOGIN_URL);
  }, []);

  return (
    <>
      <div ref={pageElemRef} className="page guide-page">
        <img src={mainPic} alt="ShopHive" className="main-pic" />
        <h2 className="title">ShopHive</h2>
        <img src={subPic} alt="ShopHive" className="sub-pic" />
        <img
          src={nextStepPic}
          alt="nextStep"
          className="arrow-icon"
          onClick={toLogin}
        />
      </div>
    </>
  );
}

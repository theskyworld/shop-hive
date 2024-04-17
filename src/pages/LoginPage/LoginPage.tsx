import "./loginPage.scss";
import {
  AGREE_ON_PRIVACY,
  HOME_PAGE_URL,
  INPUT_YOUR_PASSWORD,
  INPUT_YOUR_PHONE_NUMBER,
  LOGIN,
  LOGINING,
  LOGIN_SUCCESS,
  LOGIN_URL,
  PASSWORD,
  PHONE_NUMBER,
  POST_METHOD,
  REGISTER,
  REGISTER_URL,
} from "../../assets/ts/constants";
import { ChangeEvent, useRef, useState } from "react";
import useRequest from "../../utils/hooks/useRequest";
import { ResponseDataType } from ".";
import MessageModal, { MessageModalType } from "../../components/MessageModal";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const messageModalRef = useRef<MessageModalType>(null);
  const { request } = useRequest<ResponseDataType>({
    method: POST_METHOD,
    url: "/user/login",
    data: {
      phone: phoneNumber,
      password,
    },
  });

  function isValidInput() {
    // 未输入手机号
    if (!phoneNumber) {
      messageModalRef.current?.showModal(INPUT_YOUR_PHONE_NUMBER);
      return false;
    }
    // 未输入密码
    if (!password) {
      messageModalRef.current?.showModal(INPUT_YOUR_PASSWORD);
      return false;
    }
    return true;
  }

  function submit() {
    if (!isValidInput()) return;
    // 展示messageModal 登录中
    messageModalRef.current?.showModal(LOGINING);
    request()
      .then((data) => {
        if (data) {
          // 展示messageModal 登录成功
          messageModalRef.current?.showModal(LOGIN_SUCCESS);
          // 跳转首页
          navigate(HOME_PAGE_URL);
        }
      })
      .catch((err) => {
        // 展示messageModal 登录失败
        messageModalRef.current?.showModal(err.message);
      });
  }
  return (
    <div className="page login-page">
      <div className="tab">
        <div
          className="tab_item tab-item-left"
          onClick={() => navigate(LOGIN_URL)}
        >
          {LOGIN}
        </div>
        <div
          className="tab_item tab-item-right"
          onClick={() => navigate(REGISTER_URL)}
        >
          {REGISTER}
        </div>
      </div>
      <div className="form">
        <div className="form-item">
          <div className="form-item-title">{PHONE_NUMBER}</div>
          <input
            type="text"
            className="form-item-content"
            placeholder={INPUT_YOUR_PHONE_NUMBER}
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">{PASSWORD}</div>
          <input
            type="password"
            className="form-item-content"
            placeholder={INPUT_YOUR_PASSWORD}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
      </div>
      <div className="submit" onClick={submit}>
        {LOGIN}
      </div>
      <div className="notice">{AGREE_ON_PRIVACY}</div>
      <MessageModal ref={messageModalRef} />
    </div>
  );
}

import "./registerPage.scss";
import {
  CONFIRM_PASSWORD,
  DIFFERENT_PASSWORD,
  INPUT_YOUR_CONFIRM_PASSWORD,
  INPUT_YOUR_PASSWORD,
  INPUT_YOUR_PHONE_NUMBER,
  INPUT_YOUR_USER_NAME,
  LOGIN,
  LOGIN_URL,
  PASSWORD,
  PHONE_NUMBER,
  POST_METHOD,
  REGISTER,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_URL,
  USER_NAME,
} from "../../assets/ts/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useRequest from "../../utils/hooks/useRequest";
import { ResponseDataType } from ".";
import MessageModal, { MessageModalType } from "../../components/MessageModal";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const messageModalRef = useRef<MessageModalType>(null);
  const { request } = useRequest<ResponseDataType>({
    method: POST_METHOD,
    url: "",
    data: {
      userName,
      phoneNumber,
      password,
    },
  });

  function isValidInput() {
    // 未输入用户名
    if (!userName) {
      messageModalRef.current?.showModal(INPUT_YOUR_USER_NAME);
      return false;
    }
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
    // 前后密码不一致
    if (password !== confirmPassword) {
      messageModalRef.current?.showModal(DIFFERENT_PASSWORD);
      return false;
    }
    return true;
  }
  function submit() {
    if (!isValidInput()) return;
    // 展示messageModal 注册中
    messageModalRef.current?.showModal(REGISTERING);
    request()
      .then((data) => {
        if (data) {
          // 展示messageModal 注册成功
          messageModalRef.current?.showModal(REGISTER_SUCCESS);
          // 注册成功
          setIsRegisterSuccess(true);
        }
      })
      .catch((err) => {
        // 展示messageModal 注册失败
        messageModalRef.current?.showModal(err.message);
      });
  }
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRegisterSuccess) {
      // 2s后跳转登录页面
      timer = setTimeout(() => {
        navigate(LOGIN_URL);
      }, 2000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [isRegisterSuccess]);
  return (
    <div className="page register-page">
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
          <div className="form-item-title">{USER_NAME}</div>
          <input
            type="text"
            className="form-item-content"
            placeholder={INPUT_YOUR_USER_NAME}
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        </div>
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
        <div className="form-item">
          <div className="form-item-title">{CONFIRM_PASSWORD}</div>
          <input
            type="password"
            className="form-item-content"
            placeholder={INPUT_YOUR_CONFIRM_PASSWORD}
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>
      </div>
      <div className="submit" onClick={submit}>
        {REGISTER}
      </div>
      <MessageModal ref={messageModalRef} />
    </div>
  );
}

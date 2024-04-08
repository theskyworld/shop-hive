import "./loginPage.scss";
import {
  AGREE_ON_PRIVACY,
  INPUT_YOUR_PASSWORD,
  INPUT_YOUR_PHONE_NUMBER,
  LOGIN,
  LOGINING,
  LOGIN_SUCCESS,
  PASSWORD,
  PHONE_NUMBER,
  POST_METHOD,
  REGISTER,
} from "../../assets/ts/constants";
import { ChangeEvent, useRef, useState } from "react";
import useRequest from "../../utils/hooks/useRequest";
import { ResponseDataType } from ".";
import MessageModal, { MessageModalType } from "../../components/MessageModal";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const messageModalRef = useRef<MessageModalType>(null);
  const { request } = useRequest<ResponseDataType>({
    method: POST_METHOD,
    url: "",
    data: {
      phoneNumber,
      password,
    },
  });

  function submit() {
    // 未输入手机号
    if (!phoneNumber) {
      messageModalRef.current?.showModal(INPUT_YOUR_PHONE_NUMBER);
      return;
    }
    // 未输入密码
    if (!password) {
      messageModalRef.current?.showModal(INPUT_YOUR_PASSWORD);
      return;
    }
    // 展示messageModal 登录中
    messageModalRef.current?.showModal(LOGINING);
    request()
      .then((data) => {
        if (data) {
          // 展示messageModal 登录成功
          messageModalRef.current?.showModal(LOGIN_SUCCESS);
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
        <div className="tab_item tab-item-left">{LOGIN}</div>
        <div className="tab_item tab-item-right">{REGISTER}</div>
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

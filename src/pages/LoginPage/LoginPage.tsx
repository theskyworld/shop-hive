import "./loginPage.scss";
import {
  AGREE_ON_PRIVACY,
  INPUT_YOUR_PASSWORD,
  INPUT_YOUR_PHONE_NUMBER,
  LOGIN,
  PASSWORD,
  PHONE_NUMBER,
  POST_METHOD,
  REGISTER,
} from "../../assets/ts/constants";
import { ChangeEvent, useState } from "react";
import useRequest from "../../utils/hooks/useRequest";
import { ResponseDataType } from ".";
import FullModal from "../../components/FullModal";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, request } = useRequest<ResponseDataType>({
    method: POST_METHOD,
    url: "",
    data: {
      phoneNumber,
      password,
    },
  });

  function submit() {
    request()
      .then((data) => {
        data && console.log(data.name);
      })
      .catch((err) => {
        alert(err);
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
      {isLoading ? (
        <div className="full-modal-container">
          <FullModal />
        </div>
      ) : null}
    </div>
  );
}

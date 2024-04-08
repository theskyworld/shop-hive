import "./loginPage.scss";
import {
  AGREE_ON_PRIVACY,
  INPUT_YOUR_PASSWORD,
  INPUT_YOUR_PHONE_NUMBER,
  LOGIN,
  PASSWORD,
  PHONE_NUMBER,
  REGISTER,
} from "../../assets/ts/constants";

export default function LoginPage() {
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
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">{PASSWORD}</div>
          <input
            type="password"
            className="form-item-content"
            placeholder={INPUT_YOUR_PASSWORD}
          />
        </div>
      </div>
      <div className="submit">{LOGIN}</div>
      <div className="notice">{AGREE_ON_PRIVACY}</div>
    </div>
  );
}

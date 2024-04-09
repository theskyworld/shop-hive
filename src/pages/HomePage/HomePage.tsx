import "./homePage.scss";
import {
  INPUT_YOUR_SEARCH_CONTENT,
  YOU_GUO_GOU,
} from "../../assets/ts/constants";
import locationPic from "@assets/imgs/tab_home_icon@1x.png";
import searchPic from "@assets/imgs/home_search_icon_@1x.png";
export default function HomePage() {
  return (
    <div className="page home-page">
      <div className="banner">
        <h3 className="location">
          <img src={locationPic} alt="location" className="iconfont" />
          {YOU_GUO_GOU}
        </h3>
        <div className="search-wrapper">
          <input
            type="text"
            className="search"
            placeholder={INPUT_YOUR_SEARCH_CONTENT}
          />
          <img src={searchPic} alt="search" className="iconfont" />
        </div>
      </div>
    </div>
  );
}

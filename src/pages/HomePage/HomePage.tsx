import "./homePage.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  INPUT_YOUR_SEARCH_CONTENT,
  YOU_GUO_GOU,
} from "../../assets/ts/constants";
import locationPic from "@assets/imgs/tab_home_icon@1x.png";
import searchPic from "@assets/imgs/home_search_icon_@1x.png";
import bannerPic1 from "@assets/imgs/banner_@1x.png";
import bannerPic2 from "@assets/imgs/新品尝鲜_banner图_@1x.png";
import bannerPic3 from "@assets/imgs/首页_banner@1x.png";
import { useImmer } from "use-immer";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [pageNum, setPageNum] = useState(1);
  const originalBannerPicURLs = [
    { id: "1", url: bannerPic1, isRadius: true },
    { id: "2", url: bannerPic2, isRadius: true },
    { id: "3", url: bannerPic3, isRadius: false },
  ];
  const [bannerPicURLs] = useImmer<
    Array<{ id: string; url: string; isRadius: boolean }>
  >(originalBannerPicURLs);
  const bannerPicClassName = useMemo(() => {
    return `swiper-item-pic ${bannerPicURLs[0].isRadius ? "radius" : ""}`;
  }, [bannerPicURLs]);
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
        {/* 注意swiper中自带swiper-wrapper类名 */}
        <div className="swiper-container">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(e: unknown) => setPageNum(e.activeIndex + 1)}
          >
            {bannerPicURLs.map((item) => {
              return (
                <SwiperSlide>
                  <img
                    className={bannerPicClassName}
                    src={item.url}
                    alt="banner"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="pagination">
            <span>{pageNum}</span>/<span>{bannerPicURLs.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

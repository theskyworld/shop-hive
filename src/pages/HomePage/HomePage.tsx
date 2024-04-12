import "./homePage.scss";
import "swiper/css";
import { Swiper as SwiperCom, SwiperSlide } from "swiper/react";
import { type Swiper } from "swiper";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  INPUT_YOUR_SEARCH_CONTENT,
  NOT_SUPPORT_GEOLOCATION,
  USER_LOCATION_KEY,
  YOU_GUO_GOU,
} from "../../assets/ts/constants";
import locationPic from "@assets/imgs/tab_home_icon@1x.png";
import searchPic from "@assets/imgs/home_search_icon_@1x.png";
import bannerPic1 from "@assets/imgs/banner_@1x.png";
import bannerPic2 from "@assets/imgs/新品尝鲜_banner图_@1x.png";
import bannerPic3 from "@assets/imgs/首页_banner@1x.png";
import { useImmer } from "use-immer";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import MessageModal, { MessageModalType } from "../../components/MessageModal";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { PositionType } from ".";

// 使用经纬度获取用户位置信息
function getPositionInfo(messageModalRef: MutableRefObject<MessageModalType>) {
  const { getStorage, setStorage } = useLocalStorage();
  // 默认的经纬度信息
  const defaultPosition = {
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  };
  // 从storage中获取经纬度信息
  const storagedPosition = getStorage(USER_LOCATION_KEY);
  // 原始的经纬度信息
  const originalPosition: PositionType = storagedPosition
    ? JSON.parse(storagedPosition)
    : defaultPosition;
  // 先使用默认的经纬度信息获取默认的用户位置信息
  const [, setRequestPositionData] = useImmer(originalPosition);

  useEffect(() => {
    // 使用geolocation API获取用户位置经纬度
    if (navigator.geolocation) {
      // 当从localStorage中未获取到时才请求
      if (!storagedPosition) {
        // 成功时的回调，失败时的回调，配置对象
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { coords } = position;
            const { latitude, longitude } = coords;
            if (latitude && longitude) {
              // 更新经纬度信息
              setRequestPositionData((draft) => {
                draft.latitude = latitude;
                draft.longitude = longitude;
              });
              // 本地存储经纬度信息
              setStorage(
                USER_LOCATION_KEY,
                JSON.stringify({ latitude, longitude }),
              );
            }
          },
          (error) => {
            messageModalRef!.current.showModal(error.message);
          },
          {
            timeout: 10_000,
          },
        );
      }
    } else {
      messageModalRef.current.showModal(NOT_SUPPORT_GEOLOCATION);
    }
  }, []);
}

export default function HomePage() {
  const messageModalRef = useRef<MessageModalType>(null!);
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
  getPositionInfo(messageModalRef);
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
          <SwiperCom
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(e: Swiper) => setPageNum(e.activeIndex + 1)}
          >
            {bannerPicURLs.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <img
                    className={bannerPicClassName}
                    src={item.url}
                    alt="banner"
                  />
                </SwiperSlide>
              );
            })}
          </SwiperCom>
          <div className="pagination">
            <span>{pageNum}</span>/<span>{bannerPicURLs.length}</span>
          </div>
        </div>
      </div>
      <MessageModal ref={messageModalRef} />
    </div>
  );
}

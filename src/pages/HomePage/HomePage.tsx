import "./homePage.scss";
import "swiper/css";
import { Swiper as SwiperCom, SwiperSlide } from "swiper/react";
import { type Swiper } from "swiper";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  GHMZ,
  INPUT_YOUR_SEARCH_CONTENT,
  JJBH,
  LYSS,
  MORE,
  NOT_SUPPORT_GEOLOCATION,
  RZHB,
  SLSG,
  USER_LOCATION_KEY,
  XPCX,
  XPCX_JL_ALT,
  XPCX_JL_DESCRIPTION,
  XPCX_JL_PRICE,
  XPCX_LSG_ALT,
  XPCX_LSG_DESCRIPTION,
  XPCX_LSG_PRICE,
  XPCX_RGJ_ALT,
  XPCX_RGJ_DESCRIPTION,
  XPCX_RGJ_PRICE,
  XRDQ,
  XXLS,
  XXSC,
  XSZK,
  XSZK_HFS_ALT,
  XSZK_HNYT_DESCRIPTION,
  XSZK_HNYT_PRICE,
  XSZK_QYG_ALT,
  XSZK_QYG_DESCRIPTION,
  XSZK_QYG_PRICE,
  YOU_GUO_GOU,
  XSZK_HFS_DESCRIPTION,
  XSZK_HFS_PRICE,
  CNYH_XZM_DESCRIPTION,
  CNYH_XZM_PRICE,
  CNYH_XZM_ALT,
  CNYH_SH_DESCRIPTION,
  CNYH_SH_ALT,
  CNYH_SH_PRICE,
  CNYH_BDL_DESCRIPTION,
  CNYH_BDL_PRICE,
  CNYH_BDL_ALT,
  CNYH_SX_DESCRIPTION,
  CNYH_SX_PRICE,
  CNYH_SX_ALT,
  CNXH,
} from "../../assets/ts/constants";
import locationPic from "@assets/imgs/tab_home_icon@1x.png";
import searchPic from "@assets/imgs/home_search_icon_@1x.png";
import bannerPic1 from "@assets/imgs/banner_@1x.png";
import bannerPic2 from "@assets/imgs/新品尝鲜_banner图_@1x.png";
import bannerPic3 from "@assets/imgs/首页_banner@1x.png";
import vegetablesCategoryPic from "@assets/imgs/home_xxsc_icon_@1x.png";
import meatCategoryPic from "@assets/imgs/home_xrdq_icon_@1x.png";
import fruitCategoryPic from "@assets/imgs/home_slsg_icon_@1x.png";
import milkCategoryPic from "@assets/imgs/home_rphb_icon_@1x.png";
import oilCategoryPic from "@assets/imgs/home_lyss_icon_@1x.png";
import snacksCategoryPic from "@assets/imgs/home_xxls_icon_@1x.png";
import furnitureCategoryPic from "@assets/imgs/home_jjbh_icon_@1x.png";
import makeUpCategoryPic from "@assets/imgs/home_ghmz_icon_@1x.png";
import tasteTheNewPic from "@assets/imgs/home_xpcx_icon_@1x.png";
import jinluoPic from "@assets/imgs/xpcx金锣去皮五花肉_@1x.png";
import rouguanjiaPic from "@assets/imgs/xpcx牛肋条_@1x.png";
import leshigangPic from "@assets/imgs/xpcx波士顿龙虾_@1x.png";
import morePic from "@assets/imgs/home_more_icon_@1x.png";
import discountInLimitedTimePic from "@assets/imgs/home_xszk_icon_@1x.png";
import hainanyangtaoPic from "@assets/imgs/xszk杨桃_@1x.png";
import qiyiguoPic from "@assets/imgs/限时折扣_四川猕猴桃_@1x.png";
import hongfushiPic from "@assets/imgs/限时折扣_红富士苹果_@1x.png";
import xizhoumiPic from "@assets/imgs/猜你喜欢_西州哈密瓜_@1x.png";
import shuanghuiPic from "@assets/imgs/猜你喜欢_双汇猪小蹄_@1x.png";
import shangxianPic from "@assets/imgs/猜你喜欢_上鲜鸡翅根_@1x.png";
import bendaliPic from "@assets/imgs/猜你喜欢_奔达利牛排_@1x.png";
import { useImmer } from "use-immer";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import MessageModal, { MessageModalType } from "../../components/MessageModal";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { PositionType } from ".";
import {
  CategoryDatas,
  DiscountInLimitedTimeDatas,
  GuessYouLikeDatas,
  TasteTheNewDatas,
} from "./types";
import Card from "../../components/Card";

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

  // 分类
  const [categoryDatas] = useState<Array<CategoryDatas>>([
    {
      id: "1",
      title: XXSC,
      pic: vegetablesCategoryPic,
      alt: XXSC,
    },
    {
      id: "2",
      title: XRDQ,
      pic: meatCategoryPic,
      alt: XRDQ,
    },
    {
      id: "3",
      title: SLSG,
      pic: fruitCategoryPic,
      alt: SLSG,
    },
    {
      id: "4",
      title: RZHB,
      pic: milkCategoryPic,
      alt: RZHB,
    },
    {
      id: "5",
      title: LYSS,
      pic: oilCategoryPic,
      alt: LYSS,
    },
    {
      id: "6",
      title: XXLS,
      pic: snacksCategoryPic,
      alt: XXLS,
    },
    {
      id: "7",
      title: JJBH,
      pic: furnitureCategoryPic,
      alt: JJBH,
    },
    {
      id: "8",
      title: GHMZ,
      pic: makeUpCategoryPic,
      alt: GHMZ,
    },
  ]);

  // 新品尝鲜
  const [tasteTheNewDatas] = useState<Array<TasteTheNewDatas>>([
    {
      id: "1",
      description: XPCX_JL_DESCRIPTION,
      price: XPCX_JL_PRICE,
      alt: XPCX_JL_ALT,
      pic: jinluoPic,
    },
    {
      id: "2",
      description: XPCX_RGJ_DESCRIPTION,
      price: XPCX_RGJ_PRICE,
      alt: XPCX_RGJ_ALT,
      pic: rouguanjiaPic,
    },
    {
      id: "3",
      description: XPCX_LSG_DESCRIPTION,
      price: XPCX_LSG_PRICE,
      alt: XPCX_LSG_ALT,
      pic: leshigangPic,
    },
    {
      id: "4",
      description: XPCX_LSG_DESCRIPTION,
      price: XPCX_LSG_PRICE,
      alt: XPCX_LSG_ALT,
      pic: leshigangPic,
    },
  ]);

  // 限时折扣
  const [discountInLimitedTimeDatas] = useState<Array<TasteTheNewDatas>>([
    {
      id: "1",
      description: XSZK_HNYT_DESCRIPTION,
      price: XSZK_HNYT_PRICE,
      alt: XSZK_HFS_ALT,
      pic: hainanyangtaoPic,
    },
    {
      id: "2",
      description: XSZK_QYG_DESCRIPTION,
      price: XSZK_QYG_PRICE,
      alt: XSZK_QYG_ALT,
      pic: qiyiguoPic,
    },
    {
      id: "3",
      description: XSZK_HFS_DESCRIPTION,
      price: XSZK_HFS_PRICE,
      alt: XSZK_HFS_ALT,
      pic: hongfushiPic,
    },
    {
      id: "4",
      description: XSZK_HFS_DESCRIPTION,
      price: XSZK_HFS_PRICE,
      alt: XSZK_HFS_ALT,
      pic: hongfushiPic,
    },
  ]);

  // 猜你喜欢
  const [guessYouLikeDatas] = useState<Array<GuessYouLikeDatas>>([
    {
      id: "1",
      description: CNYH_XZM_DESCRIPTION,
      price: CNYH_XZM_PRICE,
      alt: CNYH_XZM_ALT,
      pic: xizhoumiPic,
    },
    {
      id: "2",
      description: CNYH_SH_DESCRIPTION,
      price: CNYH_SH_PRICE,
      alt: CNYH_SH_ALT,
      pic: shuanghuiPic,
    },
    {
      id: "3",
      description: CNYH_BDL_DESCRIPTION,
      price: CNYH_BDL_PRICE,
      alt: CNYH_BDL_ALT,
      pic: bendaliPic,
    },
    {
      id: "4",
      description: CNYH_SX_DESCRIPTION,
      price: CNYH_SX_PRICE,
      alt: CNYH_SX_ALT,
      pic: shangxianPic,
    },
  ]);

  getPositionInfo(messageModalRef);
  return (
    <div className="page home-page">
      {/* banner */}
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
      {/* 分类 */}
      <div className="category">
        {categoryDatas.map((item: CategoryDatas) => {
          return (
            <div className="category-item" key={item.id}>
              <img
                className="category-item-img"
                src={item.pic}
                alt={item.alt}
              />
              <p className="category-item-title">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* 新品尝鲜 */}
      <div className="taste_the_new">
        <div className="taste_the_new-header">
          <img
            src={tasteTheNewPic}
            alt={XPCX}
            className="taste_the_new-header-symbol"
          />
          <h3 className="taste_the_new-header-title">{XPCX}</h3>
          <div className="taste_the_new-header-more">
            <p>{MORE}</p>
            <img src={morePic} />
          </div>
        </div>
        <div className="taste_the_new-content">
          {tasteTheNewDatas.map((item: TasteTheNewDatas) => {
            return (
              <div className="taste_the_new-content-item" key={item.id}>
                <Card
                  description={item.description}
                  price={item.price}
                  pic={item.pic}
                  alt={item.alt}
                  width="1.1rem"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 限时折扣 */}
      <div className="discount_in_limited_time">
        <div className="discount_in_limited_time-header">
          <img
            src={discountInLimitedTimePic}
            alt={XSZK}
            className="discount_in_limited_time-header-symbol"
          />
          <h3 className="discount_in_limited_time-header-title">{XSZK}</h3>
          <div className="discount_in_limited_time-header-more">
            <p>{MORE}</p>
            <img src={morePic} />
          </div>
        </div>
        <div className="discount_in_limited_time-content">
          {discountInLimitedTimeDatas.map(
            (item: DiscountInLimitedTimeDatas) => {
              return (
                <div
                  className="discount_in_limited_time-content-item"
                  key={item.id}
                >
                  <Card
                    description={item.description}
                    price={item.price}
                    pic={item.pic}
                    alt={item.alt}
                    width="1.1rem"
                  />
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* 猜你喜欢 */}
      <div className="guess_you_like">
        <div className="guess_you_like-header">
          <h3 className="guess_you_like-header-title">{CNXH}</h3>
        </div>
        <div className="guess_you_like-content">
          {guessYouLikeDatas.map((item: GuessYouLikeDatas) => {
            return (
              <div className="guess_you_like-content-item" key={item.id}>
                <Card
                  description={item.description}
                  price={item.price}
                  pic={item.pic}
                  alt={item.alt}
                  width="1.52rem"
                />
              </div>
            );
          })}
        </div>
      </div>

      <MessageModal ref={messageModalRef} />
    </div>
  );
}

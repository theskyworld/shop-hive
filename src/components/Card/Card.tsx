import { useRef } from "react";
import { CardProps } from "./types";
import "./card.scss";
import addPic from "@assets/imgs/icon_add@1x.png";

export default function Card({
  price,
  alt,
  width: cardWidth,
  description,
  pic,
}: CardProps) {
  const cardStyle = useRef({
    width: cardWidth,
  });

  return (
    <div className="card" style={cardStyle.current}>
      <img src={pic} alt={alt || ""} className="card-img" />
      <p className="card-description">{description}</p>
      <div className="card-price">
        <span className="card-price-symbol">￥</span>
        <span className="card-price-number">{price}</span>
        <span className="card-price-add">
          <img src={addPic} />
        </span>
      </div>
    </div>
  );
}

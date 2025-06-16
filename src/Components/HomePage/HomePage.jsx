import { useEffect, useState } from "react";
import DynamicBackgrounds from "../DynamicBackgrounds";
import StickyNavbar from "../StickyNavbar";
import backgroundImage from "../../img/02.jpg";
import TextAnimation from "../TextAnimation";
import CardText from "./CardText";
import Timeline from "../Timeline";

export default function HomePage() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* 圖片區域 - 固定高度，內容居中 */}
      <div
        className="relative flex items-center justify-center bg-white"
        style={{ height: `${height * 0.6}px` }}
      >
        <img
          src={backgroundImage}
          alt="背景圖片"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
        {/* 圖片疊加層 */}
        <div className="relative z-10 text-white text-3xl font-bold">
          <TextAnimation text={"隨遇而安_"} />
        </div>
      </div>

      {/* 背景區域 - 佔滿剩餘高度 */}
      <div
        className="relative flex items-center justify-center" // 可以給一個背景色方便觀察
        style={{ height: `${height * 0.4}px` }} // 讓背景區域佔據剩餘 40% 高度
      >
        <DynamicBackgrounds height={height} />
      </div>

      {/* 白色卡片區域 - 使用絕對定位使其浮動 */}
      <div
        className="absolute w-full flex justify-center"
        style={{ top: `${height * 0.6 - 100}px` }} // 調整這個值來控制卡片覆蓋圖片的程度
      >
        <CardText />
      </div>

      {/* 時間軸區域 */}
      <div
        className="w-full flex justify-center"
        style={{ marginTop: `${height * 0.5 + 100}px` }}
      >
        {" "}
        {/* 調整 mt-20 以避免與卡片重疊 */}
        <Timeline />
      </div>

      {/* StickyNavbar - 確保它在最上層 */}
      <StickyNavbar />
    </div>
  );
}

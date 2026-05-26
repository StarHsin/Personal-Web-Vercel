import DynamicBackgrounds from "../DynamicBackgrounds";
import StickyNavbar from "../StickyNavbar";
import LoadFirebaseImg from "../LoadFirebaseImg";
import TextAnimation from "../TextAnimation";
import CardText from "./CardText";
import Timeline from "../Timeline";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-800">
      {/* 圖片區域 - 固定高度，內容居中 */}
      <section className="relative z-12 flex min-h-[52svh] items-center justify-center overflow-hidden bg-white px-4 pt-20 sm:min-h-[58svh] lg:min-h-[62svh]">
        <LoadFirebaseImg path="images/Other/02.jpg" />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
        {/* 圖片疊加層 */}
        <div className="relative z-10 text-center text-3xl font-bold leading-tight text-white sm:text-5xl">
          <TextAnimation text={"隨遇而安_"} />
        </div>
      </section>

      <section className="relative bg-slate-800 px-3 pb-12 sm:px-6 lg:pb-16">
        <DynamicBackgrounds />
        {/* 白色卡片區域 - 使用負位移保留浮動效果 */}
        <div className="relative z-15 mx-auto flex w-full max-w-5xl -translate-y-20 justify-center sm:-translate-y-24 lg:-translate-y-28">
          <CardText />
        </div>

        {/* 時間軸區域 */}
        <div className="relative z-10 -mt-12 sm:-mt-14 lg:-mt-16">
          <Timeline />
        </div>
      </section>
      <StickyNavbar />
    </div>
  );
}

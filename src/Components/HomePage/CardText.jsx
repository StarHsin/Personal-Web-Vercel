import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";

export default function CardText() {
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <Card className="w-4/5 md:w-3/5 shadow-lg bg-slate-800 border-slate-800 z-20">
      <CardContent className="flex flex-col items-start text-left">
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-2xl" : "text-4xl"
          } font-bold w-full mt-6 text-center`}
        >
          李慧芯
        </div>
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-sm" : "text-base"
          } font-normal w-full text-center`}
        >
          每天讓自己進步一點
        </div>
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-lg" : "text-2xl"
          } font-bold mx-[5%] mt-4`}
        >
          關於About
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-base" : "text-xl"
          } font-normal w-full px-5 text-center space-y-1`}
        >
          <p>
            國立勤益科技大學 電機工程系
            {width < 470 ? <br /> : null}
            應屆畢業生
          </p>
          <p>
            即將就讀 國立臺北科技大學 {width < 470 ? <br /> : null}
            電機工程系 碩士班
          </p>
          <p>正在學習：Python、React...</p>
        </div>
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-lg" : "text-2xl"
          } font-bold mx-[5%] mt-8`}
        >
          經歷 Experiences
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <ul
          className={`text-gray-200 ${
            width < 470 ? "pl-4" : "px-10"
          } md:px-15 list-disc list-inside space-y-1`}
        >
          <li>
            2021年華碩文教基金會 {width < 470 ? <br /> : null}
            <span className={width < 470 ? "px-6" : ""}>
              i-Taiwan 數位志工計畫
              <span className="font-bold"> 隊輔</span>
            </span>
          </li>
          <li>
            111年寒假教育優先區營隊 <span className="font-bold">隊輔</span>
          </li>
          <li>
            原鄉永續智慧溫室計畫 <span className="font-bold">志工</span>
          </li>
          <li>
            教育部數位學伴 <span className="font-bold">國三數學學伴</span>
          </li>
        </ul>
        <div
          className={`text-gray-200 ${
            width < 470 ? "text-lg" : "text-2xl"
          } font-bold mx-[5%] mt-8`}
        >
          社團 Club
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <ul
          className={`text-gray-200 ${
            width < 470 ? "pl-4" : "px-10"
          } md:px-15 list-disc list-inside space-y-1 mb-6`}
        >
          <li>
            2021年勤益校安嘉年華 <span className="font-bold">表演</span>
          </li>
          <li>
            2021年聖音現象 <span className="font-bold">表演</span>
          </li>
          <li>
            2022勤益明秀企業家 <span className="font-bold">表演</span>
          </li>
          <li>
            2021.2022.2023年勤益校慶 <span className="font-bold">表演</span>
          </li>
          <li>
            2022.2023.2024年勤益原民週 <span className="font-bold">表演</span>
          </li>
          <li>2022年中區原民運動會</li>
          <li>2022年台中市定向越野運動體驗</li>
        </ul>
      </CardContent>
    </Card>
  );
}

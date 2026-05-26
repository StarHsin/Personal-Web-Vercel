import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";

export default function CardText() {
  return (
    <Card className="z-20 w-full max-w-3xl border-slate-800 bg-slate-800 shadow-lg lg:max-w-4xl">
      <CardContent className="flex flex-col items-start px-4 text-left sm:px-6 md:px-8">
        <div className="mt-2 w-full text-center text-2xl font-bold text-gray-200 sm:mt-6 sm:text-4xl">
          李慧芯
        </div>
        <div className="w-full text-center text-sm font-normal text-gray-200 sm:text-base">
          每天讓自己進步一點
        </div>
        <div className="mx-[5%] mt-4 text-lg font-bold text-gray-200 sm:text-2xl">
          關於About
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <div className="w-full space-y-1 px-1 text-center text-base font-normal text-gray-200 sm:px-5 sm:text-xl">
          <p>
            <span>目前就讀 國立臺北科技大學</span>
            <span className="block sm:inline"> 電機工程系 碩士班</span>
          </p>
          <p>正在學習：Python、React ...</p>
        </div>
        <div className="mx-[5%] mt-8 text-lg font-bold text-gray-200 sm:text-2xl">
          經歷 Experiences
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <ul className="w-full list-disc space-y-1 px-2 pl-5 text-sm text-gray-200 sm:px-10 sm:text-base md:px-15">
          <li>
            <span>2025年12月 - 2026年5月</span>
            <span className="block ps-5 sm:inline sm:ps-1">與人協作開發</span>
          </li>
          <li>
            <span>2021年華碩文教基金會</span>
            <span className="block ps-5 sm:inline sm:ps-1">
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
        <div className="mx-[5%] mt-8 text-lg font-bold text-gray-200 sm:text-2xl">
          社團 Club
        </div>
        <Separator className="mb-4 bg-gray-200 mx-auto" />
        <ul className="mb-2 w-full list-disc space-y-1 px-2 pl-5 text-sm text-gray-200 sm:mb-6 sm:px-10 sm:text-base md:px-15">
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

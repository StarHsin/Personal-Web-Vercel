import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";

export default function CardText() {
  return (
    <Card className="w-4/5 md:w-3/5 lg:w-3/5 p-16 shadow-lg bg-slate-800 border-slate-800 z-20">
      <CardContent className="flex flex-col items-start text-left">
        <h2 className="text-4xl font-bold mb-2 w-full text-center text-gray-200">
          李慧芯
        </h2>
        <h3 className="text-base font-normal mb-4 w-full text-center text-gray-200">
          每天讓自己進步一點
        </h3>
        <h3 className="text-2xl font-bold mb-2 text-gray-200 mt-4">
          關於About
        </h3>
        <Separator className="mb-4 bg-gray-200" />
        <div className="text-gray-200 mb-4 w-full text-center text-xl space-y-1 ">
          {" "}
          {/* 使用 space-y-1 增加段落間距 */}
          <p>國立勤益科技大學 電機工程系 應屆畢業生</p>
          <p>即將就讀 國立臺北科技大學 電機工程系 碩士班</p>
          <p>正在學習：Python、React...</p>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-200 mt-4">
          經歷 Experiences
        </h3>
        <Separator className="mb-4 bg-gray-200" />
        <ul className="text-gray-200 mb-4 space-y-1 pl-4 list-disc list-inside">
          {" "}
          {/* 使用 ul, li，並加入 list-disc 和 list-inside */}
          <li>
            2021年華碩文教基金會 i-Taiwan 數位志工計畫{" "}
            <span className="font-bold">隊輔</span>
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

        <h3 className="text-2xl font-bold mb-2 text-gray-200 mt-4">
          社團 Club
        </h3>
        <Separator className="mb-4 bg-gray-200" />
        <ul className="text-gray-200 mb-4 space-y-1 pl-4 list-disc list-inside">
          {" "}
          {/* 使用 ul, li，並加入 list-disc 和 list-inside */}
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

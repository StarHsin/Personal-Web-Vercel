import DynamicBackgrounds from "../DynamicBackgrounds";
import StickyNavbar from "../StickyNavbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import AwardCategory from "./AwardCategory";
import { motion } from "framer-motion"; // 如果您安裝了 Framer Motion

import { competitions } from "../../data/competitions";
import { academics } from "../../data/academics";
import { literary } from "../../data/literary";

const MotionDiv = motion.div;

export default function Awards() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900 text-white">
      <DynamicBackgrounds />
      <StickyNavbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-12 pt-28 sm:px-4 lg:pb-16">
        <h1 className="mb-8 bg-gradient-to-r from-sky-300 to-sky-600 bg-clip-text text-center text-3xl font-extrabold text-transparent sm:mb-12 sm:text-5xl">
          我的榮譽與成就
        </h1>

        <div className="mb-8 flex justify-center">
          <Tabs defaultValue="skills" className="w-full max-w-4xl">
            <TabsList className="grid min-h-11 w-full grid-cols-3 rounded-lg bg-gray-800">
              <TabsTrigger
                value="skills"
                className="whitespace-normal px-2 py-2 text-xs text-gray-200 hover:text-white data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 sm:text-base"
              >
                技能競賽
              </TabsTrigger>
              <TabsTrigger
                value="academics"
                className="whitespace-normal px-2 py-2 text-xs text-gray-200 hover:text-white data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 sm:text-base"
              >
                學業表現
              </TabsTrigger>
              <TabsTrigger
                value="literary"
                className="whitespace-normal px-2 py-2 text-xs text-gray-200 hover:text-white data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 sm:text-base"
              >
                文學競賽
              </TabsTrigger>
            </TabsList>

            {/* 技能競賽內容 */}
            <TabsContent value="skills" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="技能競賽" data={competitions} />
              </MotionDiv>
            </TabsContent>

            {/* 學業表現內容 */}
            <TabsContent value="academics" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="學業表現" data={academics} />
              </MotionDiv>
            </TabsContent>

            {/* 文學競賽內容 */}
            <TabsContent value="literary" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="文學競賽" data={literary} />
              </MotionDiv>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

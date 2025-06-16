import DynamicBackgrounds from "../DynamicBackgrounds";
import StickyNavbar from "../StickyNavbar";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import AwardCategory from "./AwardCategory";
import { motion } from "framer-motion"; // 如果您安裝了 Framer Motion

import { competitions } from "../../data/competitions";
import { academics } from "../../data/academics";
import { literary } from "../../data/literary";

export default function Awards() {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-gray-900 text-white">
      <DynamicBackgrounds />
      <StickyNavbar />

      <main className="container mx-auto px-4 py-16 relative top-10 z-10">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600">
          我的榮譽與成就
        </h1>

        <div className="flex justify-center mb-8">
          <Tabs defaultValue="skills" className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 rounded-lg">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 text-gray-200 hover:text-white text-base"
              >
                技能競賽
              </TabsTrigger>
              <TabsTrigger
                value="academics"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 text-gray-200 hover:text-white text-base"
              >
                學業表現
              </TabsTrigger>
              <TabsTrigger
                value="literary"
                className="data-[state=active]:bg-sky-500 data-[state=active]:text-gray-900 text-gray-200 hover:text-white "
              >
                文學競賽
              </TabsTrigger>
            </TabsList>

            {/* 技能競賽內容 */}
            <TabsContent value="skills" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="技能競賽" data={competitions} />
              </motion.div>
            </TabsContent>

            {/* 學業表現內容 */}
            <TabsContent value="academics" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="學業表現" data={academics} />
              </motion.div>
            </TabsContent>

            {/* 文學競賽內容 */}
            <TabsContent value="literary" className="mt-8">
              {/* 可選的 Framer Motion 動畫 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AwardCategory title="文學競賽" data={literary} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

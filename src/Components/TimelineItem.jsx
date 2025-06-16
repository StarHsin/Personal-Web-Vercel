import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaAward,
  FaTrophy,
  FaCode,
  FaLightbulb,
  FaMedal,
} from "react-icons/fa"; // 範例常用的 react-icons

const IconMap = {
  award: FaAward,
  trophy: FaTrophy,
  code: FaCode,
  lightbulb: FaLightbulb,
  medal: FaMedal,
};

export default function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // 當項目有 50% 進入視圖時觸發一次

  const IconComponent = IconMap[item.icon] || FaAward; // 預設圖示

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }, // 每個項目稍微延遲出現
    },
  };

  return (
    <motion.div
      ref={ref}
      className="mb-8 flex justify-end items-center w-full relative" // 新增 left-timeline 類別
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="order-1 bg-transparent w-3/4 px-6 py-4 text-left ">
        {" "}
        {/* 內容在左側，文字右對齊 */}
        <h3 className="mb-3 font-bold text-gray-200 text-2xl">{item.year}</h3>
        <h4 className="mb-2 font-bold text-gray-200 text-lg">{item.title}</h4>
        <p className="font-medium text-md leading-snug tracking-wide text-gray-200 text-opacity-100">
          {item.description}
        </p>
      </div>
      <div
        className="z-20 flex items-center justify-center bg-sky-600 shadow-xl w-10 h-10 rounded-full absolute"
        style={{ left: "20%", transform: "translateX(-50%)" }} // 調整 left 值與線條對齊，並用 translateX 居中
      >
        <IconComponent className="text-white text-2xl" />
      </div>
    </motion.div>
  );
}

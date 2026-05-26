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

const MotionDiv = motion.div;

export default function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // 當項目有 50% 進入視圖時觸發一次

  const IconComponent = IconMap[item.icon] || FaAward; // 預設圖示
  const isLeftOnDesktop = index % 2 === 1;

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }, // 每個項目稍微延遲出現
    },
  };

  return (
    <MotionDiv
      ref={ref}
      className="relative mb-8 w-full pl-14 md:grid md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:gap-4 md:pl-0"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div
        className={`min-w-0 rounded-lg bg-slate-900/20 px-4 py-4 text-left md:row-start-1 md:px-6 ${
          isLeftOnDesktop
            ? "md:col-start-1 md:text-right"
            : "md:col-start-3"
        }`}
      >
        <h3 className="mb-3 text-xl font-bold text-gray-200 sm:text-2xl">
          {item.year}
        </h3>
        <h4 className="mb-2 text-base font-bold text-gray-200 sm:text-lg">
          {item.title}
        </h4>
        <p className="text-sm font-medium leading-relaxed tracking-wide text-gray-200 text-opacity-100 sm:text-base">
          {item.description}
        </p>
      </div>

      <div className="absolute left-5 top-4 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-sky-600 shadow-xl md:static md:col-start-2 md:row-start-1 md:mx-auto md:mt-4 md:translate-x-0">
        <IconComponent className="text-white text-2xl" />
      </div>
    </MotionDiv>
  );
}

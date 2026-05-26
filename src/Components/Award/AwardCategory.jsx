// src/components/AwardCategory.jsx
import React from "react";
import AwardItem from "./AwardItem"; // 確保路徑正確，使用 AwardItem 來顯示單個獎項
// 不再需要在這裡導入所有資料，資料會通過 props 傳入

export default function AwardCategory({ title, data }) {
  const sortedData = [...data].sort((a, b) => {
    // 將年份轉換為數字進行比較，確保正確排序
    return parseInt(b.year) - parseInt(a.year);
  });

  // 接收 title 和 data props
  return (
    <div className="mx-auto w-full px-0 py-4 sm:px-4 sm:py-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-200 sm:mb-8 sm:text-3xl">
        {title}
      </h2>
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-gray-800 shadow-lg">
        {/* 直接遍歷傳入的 data prop */}
        {sortedData.map((item, index) => (
          <AwardItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

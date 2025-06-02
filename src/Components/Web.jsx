import React from "react";
import StickyNavbar from "./StickyNavbar"; // 假設你仍然需要這個導覽列

export default function Web() {
  // 請將此處替換為你實際的 Notion 公開分享連結
  const notionPageUrl =
    "https://somber-verse-1b6.notion.site/ebd/1c22cef653fa809681e4e490c8dbab91";

  return (
    <div className="absolute w-full min-h-screen pt-20 bg-white">
      <StickyNavbar />
      {/* 調整高度以適應你的需求 */}
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <iframe
          src={notionPageUrl}
          className="w-full h-full border-none" // 讓 iframe 佔滿可用空間
          title="Notion Page"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react"; // 匯入 useEffect 和 useState
import { useLocation } from "react-router-dom"; // 匯入 useLocation
import StickyNavbar from "./StickyNavbar"; // 假設你仍然需要這個導覽列

export default function Web() {
  const location = useLocation(); // 取得當前路由資訊
  const [notionPageUrl, setNotionPageUrl] = useState(""); // 使用 state 來管理 Notion 頁面 URL

  useEffect(() => {
    // 根據路徑名稱設定不同的 Notion 頁面 URL
    if (location.pathname === "/Web") {
      setNotionPageUrl(
        "https://flashy-appliance-d7b.notion.site/ebd/20efa315262c80fb8b07c13ab4ef5825"
      );
    } else if (location.pathname === "/Japanese") {
      setNotionPageUrl(
        "https://flashy-appliance-d7b.notion.site/ebd/20efa315262c8087b568f74eb5af9b6a"
      );
    }
  }, [location.pathname]); // 當 location.pathname 改變時重新執行這個 effect

  return (
    <div className="absolute w-full min-h-screen pt-20 bg-white">
      <StickyNavbar />
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        {/* 只有當 notionPageUrl 有值時才渲染 iframe */}
        {notionPageUrl ? (
          <iframe
            src={notionPageUrl}
            className="w-full h-full border-none"
            title="Notion Page"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div>載入中或頁面不存在...</div> // 載入中提示
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react"; // 引入 useState
import { AiOutlineMenu } from "./icon"; // 假設這裡定義了AiOutlineMenu
import CustomBreadcrumb from "./CustomBreadcrumb";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import SideBarContent from "./SideBarContent";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
//import { FaUser } from "./icon"; // 假設這裡定義了FaUser

export default function StickyNavbar() {
  const location = useLocation(); // 獲取當前路由信息

  // 根據初始路由設定 scrolled 的初始值
  const [scrolled, setScrolled] = useState(
    location.pathname === "/Web" || location.pathname === "/Japanese"
  );

  useEffect(() => {
    const handleScroll = () => {
      // 當滾動距離超過 50px 時，設定 scrolled 為 true，否則為 false
      if (location.pathname === "/Web" || location.pathname === "/Japanese") {
        console.log("route");
        setScrolled(true);
      } else {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // 監聽滾動事件
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll); // 組件卸載時移除監聽器
    };
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full top-0 start-0 z-50 transition-colors duration-300 ${
        // 添加 transition-colors 和 duration
        scrolled ? "bg-gray-800 shadow-md" : "bg-transparent" // 根據 scrolled 狀態切換背景色和陰影
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center justify-center text-white rounded-lg w-10 h-10 ${
                scrolled ? "hover:bg-gray-700" : "hover:bg-gray-500" // 根據 scrolled 狀態調整 hover 效果
              }`}
            >
              <AiOutlineMenu className="w-12 h-12" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SideBarContent />
          </SheetContent>
        </Sheet>

        <CustomBreadcrumb />
        <Button className="w-15 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-500 bg-transparent rounded-xl">
          <a
            href="https://github.com/StarHsin/Personal-Web-Vercel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold"
          >
            Github
          </a>
        </Button>
      </div>
    </nav>
  );
}

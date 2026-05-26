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
  const [scrolled, setScrolled] = useState(location.pathname === "/");

  useEffect(() => {
    const handleScroll = () => {
      // 當滾動距離超過 50px 時，設定 scrolled 為 true，否則為 false
      if (location.pathname === "/") {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      } else {
        setScrolled(true);
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        // 添加 transition-colors 和 duration
        scrolled ? "bg-gray-800 shadow-md" : "bg-transparent" // 根據 scrolled 狀態切換背景色和陰影
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${
                scrolled ? "hover:bg-gray-700" : "hover:bg-gray-500" // 根據 scrolled 狀態調整 hover 效果
              }`}
            >
              <AiOutlineMenu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-72 p-0">
            <SideBarContent />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1 px-1">
          <CustomBreadcrumb />
        </div>
        <Button className="flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-transparent px-3 hover:bg-gray-500 sm:px-4">
          <a
            href="https://github.com/StarHsin/Personal-Web-Vercel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white sm:text-base"
          >
            Github
          </a>
        </Button>
      </div>
    </nav>
  );
}

import React from "react";
import { FaUser } from "./icon"; // 假設這裡定義了FaUser
import { AiOutlineMenu } from "./icon"; // 假設這裡定義了AiOutlineMenu
import CustomBreadcrumb from "./CustomBreadcrumb";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"; // 從 shadcn/ui 導入 Sheet 相關元件
import SideBarContent from "./SideBarContent"; // 我們將把 SideBar 的內容提取到一個新元件中
import { Button } from "./ui/button"; // 從 shadcn/ui 導入 Button 元件

export default function StickyNavbar() {
  return (
    <nav className="fixed w-full top-0 start-0 z-50 shadow-md">
      <div className="flex bg-transparent items-center justify-between p-4">
        {/* 使用 SheetTrigger 包裹觸發按鈕 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center justify-center text-white bg-transparent hover:bg-gray-500 rounded-lg w-10 h-10"
            >
              <AiOutlineMenu className="w-12 h-12" />
            </Button>
          </SheetTrigger>
          {/* SheetContent 包含側邊欄的內容 */}
          <SheetContent side="left" className="w-72 p-0">
            <SideBarContent />
          </SheetContent>
        </Sheet>

        <CustomBreadcrumb />
        <Button className="w-15 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-500 bg-transparent rounded-xl">
          <a
            href="https://github.com/StarHsin/Personal-Web-Vercel"
            target="_blank"
            rel="noopener noreferrer" // 建議為了安全考量加上此屬性
            className="text-white font-semibold"
          >
            Github
          </a>
        </Button>
      </div>
    </nav>
  );
}

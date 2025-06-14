// StickyNavbar.jsx (或 .tsx)
import React from "react";
import { FaUser } from "./icon"; // 假設這裡定義了FaUser
import { AiOutlineMenu } from "./icon"; // 假設這裡定義了AiOutlineMenu
import CustomBreadcrumb from "./CustomBreadcrumb";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"; // 從 shadcn/ui 導入 Sheet 相關元件
import SideBarContent from "./SideBarContent"; // 我們將把 SideBar 的內容提取到一個新元件中

export default function StickyNavbar() {
  return (
    <nav className="fixed w-full top-0 start-0 border-b-2 border-gray-500 z-50">
      <div className="flex bg-slate-800 items-center justify-between p-4">
        {/* 使用 SheetTrigger 包裹觸發按鈕 */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center justify-center text-white bg-transparent hover:bg-gray-500 rounded-lg w-10 h-10 border-2 border-gray-500">
              <AiOutlineMenu className="w-8 h-8" />
            </button>
          </SheetTrigger>
          {/* SheetContent 包含側邊欄的內容 */}
          <SheetContent side="left" className="w-72 p-0">
            <SideBarContent />
          </SheetContent>
        </Sheet>

        <CustomBreadcrumb />
        <button className="w-10 h-10 flex items-center justify-center overflow-hidden bg-white rounded-full">
          <FaUser className="w-10 h-10 text-gray-500 relative top-1" />
        </button>
      </div>
    </nav>
  );
}

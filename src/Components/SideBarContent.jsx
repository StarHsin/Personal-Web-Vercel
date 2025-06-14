// SideBarContent.jsx (或 .tsx)
import React, { useState } from "react";
import { GrCertificate } from "react-icons/gr";
import { PiNotePencilBold } from "react-icons/pi";
import { FaChevronDown, FaRegFileAlt } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// 導入 shadcn/ui 元件
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button"; // 使用 shadcn/ui 的 Button
import {
  SheetClose,
  SheetTitle, // <-- 導入 SheetTitle
} from "./ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export default function SideBarContent() {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleNavigateToAwards = () => {
    navigate("/awards");
    // 您可能需要在這裡添加關閉 Sheet 的邏輯
    // 如果您想在點擊後自動關閉側邊欄，可以從 props 接收 closeSheet 函數
  };

  const handleActivity = () => {
    navigate("/Activity");
  };

  const handleWeb = () => {
    navigate("/Web");
  };

  const handleJapanese = () => {
    navigate("/Japanese");
  };

  return (
    <div className="flex h-full flex-col bg-white p-4">
      <div className="flex items-center justify-between pb-4">
        <SheetTitle className="text-base font-semibold text-gray-500 uppercase">
          Menu
        </SheetTitle>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Button
              onClick={handleNavigateToAwards}
              variant="ghost" // 可以選擇 ghost, link 等樣式
              className="flex w-full items-center justify-start p-2 text-gray-500 hover:text-gray-900"
            >
              <GrCertificate className="h-5 w-5" />
              <span className="ml-3 font-bold">獲獎紀錄</span>
            </Button>
          </li>
          <li>
            {/* 使用 Collapsible 來處理下拉選單 */}
            <Collapsible open={dropDown} onOpenChange={setDropDown}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start p-2 text-gray-500 hover:text-gray-900"
                >
                  <PiNotePencilBold className="h-5 w-5" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left rtl:text-right font-bold">
                    筆記
                  </span>
                  <FaChevronDown
                    className={`transition-transform ${
                      dropDown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="space-y-2 py-2">
                  <li>
                    <Button
                      onClick={handleWeb}
                      variant="ghost"
                      className="flex w-full items-center justify-start rounded-lg pl-11 text-gray-900 hover:bg-gray-100"
                    >
                      Web
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={handleJapanese}
                      variant="ghost"
                      className="flex w-full items-center justify-start rounded-lg pl-11 text-gray-900 hover:bg-gray-100"
                    >
                      日語
                    </Button>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>

          {/*
          <li>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start p-2 text-gray-500 hover:text-gray-900"
            >
              <FaRegFileAlt className="h-5 w-5" />
              <span className="ml-3 font-bold">作品集</span>
            </Button>
          </li> */}

          <li>
            <Button
              onClick={handleActivity}
              variant="ghost"
              className="flex w-full items-center justify-start p-2 text-gray-500 hover:text-gray-900"
            >
              <FiActivity className="h-5 w-5" />
              <span className="ml-3 font-bold">活動</span>
            </Button>
          </li>
        </ul>
      </div>

      <div className="mt-auto flex items-center">
        <Avatar className="h-8 w-8 rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex flex-col">
          <span className="text-gray-700 text-sm font-semibold">李慧芯</span>
          <span className="text-gray-500 text-xs">
            3b012015@gm.student.ncut.edu.tw
          </span>
        </div>
      </div>
    </div>
  );
}

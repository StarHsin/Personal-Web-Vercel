import PhotoShow from "./PhototShow";
import StickyNavbar from "../StickyNavbar";
import { useLocation } from "react-router-dom";

export default function ActivityPhotos() {
  const location = useLocation();
  const folderName = location.state?.folderName || "未選擇活動"; // 預設值

  const displayedFolderName = folderName.startsWith("00")
    ? folderName.slice(2) // 如果以 "00" 開頭，則移除前兩個字元
    : folderName; // 否則，保持原樣

  return (
    <main className="min-h-screen w-full bg-slate-800 px-3 pt-24 sm:px-4">
      <StickyNavbar />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-lg border-4 border-transparent bg-transparent">
        <div className="max-w-full break-words text-center text-2xl font-bold leading-tight text-white sm:text-[2rem]">
          {displayedFolderName}
        </div>
        <PhotoShow folderName={folderName} />
      </div>
    </main>
  );
}

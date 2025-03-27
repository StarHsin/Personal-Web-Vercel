import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import ImgShow from "./ImgShow";
import ActivityScraping from "./ActivityScraping";
import StickyNavbar from "../StickyNavbar";

export default function ActivityPage() {
    const navigate = useNavigate();

    const handlePhotos = (folderName) => {
        navigate("/Activity/Photos", { state: { folderName } });  // 傳遞 folderName 到 /Photos
    };

    return (
        <nav className="absolute w-full pt-20 bg-slate-800">
            <StickyNavbar />
            <div className="w-full max-w-3xl mx-auto p-4 flex flex-col justify-center items-center">
                <ActivityScraping onFolderClick={handlePhotos} />
            </div>
        </nav>
    );
}

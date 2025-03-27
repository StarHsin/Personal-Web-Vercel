import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, list } from "firebase/storage";
import { storage } from "../../../firebaseConfig"; // 引入共用的 storage 物件

const PARENT_FOLDER_PATH = "images/Activity Img"; // Firebase Storage 中的父資料夾路徑
const PREVIEW_IMAGE_COUNT = 4; // 預覽圖片數量

export default function ActivityScraping({ onFolderClick }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const activityImgRef = ref(storage, PARENT_FOLDER_PATH);

    listAll(activityImgRef)
      .then(async (res) => {
        const folderPromises = res.prefixes.map(async (folderRef) => {
          const folderName = folderRef.name;
          const folderImagesRef = ref(storage, `${PARENT_FOLDER_PATH}/${folderName}`);

          // 使用 list() 方法只獲取前 PREVIEW_IMAGE_COUNT 個圖片的引用
          const imageListResult = await list(folderImagesRef, { maxResults: PREVIEW_IMAGE_COUNT });
          const imagePromises = imageListResult.items.map(async (itemRef) => {
            return await getDownloadURL(itemRef);
          });
          const images = await Promise.all(imagePromises);

          return { name: folderName, images };
        });

        Promise.all(folderPromises).then(results => {
          const reversedResults = [...results].reverse();
          setFolders(reversedResults);
        });
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {folders.map((folder, index) => {
        const displayedFolderName = folder.name.startsWith("00")
          ? folder.name.slice(2)
          : folder.name;

        return (
          <button
            key={index}
            className="mb-6 w-full text-left flex flex-col justify-center items-center"
            onClick={() => onFolderClick(folder.name)}
          >
            <div className="text-[2rem] font-bold text-white mb-2">{displayedFolderName}</div>
            <div className="grid grid-cols-4 gap-4">
              {folder.images.map((src, idx) => (
                <LazyLoadImage
                  key={idx}
                  className="w-full h-auto rounded-lg mb-4"
                  src={src}
                  alt=""
                  effect="blur"
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
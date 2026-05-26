import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import Lightbox from "./Lightbox";
import { Progress } from "@/Components/ui/progress"; // 確保路徑正確

const PARENT_FOLDER_PATH = "images/Activity Img";

export default function PhotoShow({ folderName }) {
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [currentLightboxType, setCurrentLightboxType] = useState("");
  const [loading, setLoading] = useState(true); // 加入 loading 狀態
  const [progressValue, setProgressValue] = useState(0); // 可選：追蹤載入進度

  useEffect(() => {
    setPortraitImages([]);
    setLandscapeImages([]);
    setLoading(true); // 開始載入時設定為 true
    setProgressValue(0); // 重置進度
    const folderPath = `${PARENT_FOLDER_PATH}/${folderName}`;
    const listRef = ref(storage, folderPath);

    listAll(listRef)
      .then((res) => {
        const totalImages = res.items.length;
        let loadedImages = 0;

        const imagePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedImages++;
              setProgressValue((loadedImages / totalImages) * 100); // 更新進度
              resolve({
                url,
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
            };
            img.onerror = () => {
              loadedImages++;
              setProgressValue((loadedImages / totalImages) * 100); // 即使載入失敗也更新進度
              resolve({ url, width: 0, height: 0 });
            };
            img.src = url;
          });
        });
        return Promise.all(imagePromises);
      })
      .then((imagesWithDimensions) => {
        const portraits = [];
        const landscapes = [];
        imagesWithDimensions.forEach((img) => {
          if (img.width > 0 && img.height > 0) {
            if (img.height >= img.width) {
              portraits.push(img.url);
            } else {
              landscapes.push(img.url);
            }
          }
        });
        setPortraitImages(portraits);
        setLandscapeImages(landscapes);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      })
      .finally(() => {
        setLoading(false); // 載入完成後設定為 false
      });
  }, [folderName]); // 僅在 folderName 改變時重新載入

  const openLightbox = (index, type) => {
    setCurrentLightboxIndex(index);
    setCurrentLightboxType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const getCurrentImageList = () => {
    return currentLightboxType === "portrait"
      ? portraitImages
      : landscapeImages;
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center p-4">
        <Progress value={progressValue} className="w-full" />
        <div className="text-sm text-gray-200">
          載入圖片中... ({Math.round(progressValue)}%)
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-1 sm:p-4">
      {landscapeImages.length > 0 &&
        portraitImages.length <= landscapeImages.length && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {landscapeImages.map((src, index) => (
                <LazyLoadImage
                  key={index}
                  className="aspect-[4/3] w-full cursor-pointer rounded-lg object-cover"
                  src={src}
                  alt=""
                  effect="blur"
                  onClick={() => openLightbox(index, "landscape")}
                />
              ))}
            </div>
          </div>
        )}

      {portraitImages.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {portraitImages.map((src, index) => (
              <LazyLoadImage
                key={index}
                className="aspect-[3/4] w-full cursor-pointer rounded-lg object-cover"
                src={src}
                alt=""
                effect="blur"
                onClick={() => openLightbox(index, "portrait")}
              />
            ))}
          </div>
        </div>
      )}

      {landscapeImages.length > 0 &&
        portraitImages.length > landscapeImages.length && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {landscapeImages.map((src, index) => (
                <LazyLoadImage
                  key={index}
                  className="aspect-[4/3] w-full cursor-pointer rounded-lg object-cover"
                  src={src}
                  alt=""
                  effect="blur"
                  onClick={() => openLightbox(index, "landscape")}
                />
              ))}
            </div>
          </div>
        )}

      {lightboxOpen && (
        <Lightbox
          isOpen={lightboxOpen}
          images={getCurrentImageList()}
          onClose={closeLightbox}
          initialIndex={currentLightboxIndex}
        />
      )}
    </div>
  );
}

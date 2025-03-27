import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaChevronRight, FaChevronLeft, AiOutlineClose } from "../icon";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

const PARENT_FOLDER_PATH = "images/Activity Img"; // Firebase Storage 中的父資料夾路徑

export default function PhotoShow({ folderName }) {
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageType, setCurrentImageType] = useState(""); // 'portrait' or 'landscape'

  useEffect(() => {
    setPortraitImages([]);
    setLandscapeImages([]);
    const folderPath = `${PARENT_FOLDER_PATH}/${folderName}`;
    const listRef = ref(storage, folderPath);

    listAll(listRef)
      .then((res) => {
        const imagePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({ url, width: img.naturalWidth, height: img.naturalHeight });
            };
            img.onerror = () => {
              resolve({ url, width: 0, height: 0 }); // 處理載入錯誤的情況
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
      });
  }, [folderName]);

  const openLightbox = (index, type) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    setCurrentImageType(type);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImageType("");
  };

  const prevImage = () => {
    if (currentImageType === "portrait") {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? portraitImages.length - 1 : prevIndex - 1));
    } else if (currentImageType === "landscape") {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? landscapeImages.length - 1 : prevIndex - 1));
    }
  };

  const nextImage = () => {
    if (currentImageType === "portrait") {
      setCurrentImageIndex((prevIndex) => (prevIndex === portraitImages.length - 1 ? 0 : prevIndex + 1));
    } else if (currentImageType === "landscape") {
      setCurrentImageIndex((prevIndex) => (prevIndex === landscapeImages.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const getCurrentImageSrc = () => {
    if (currentImageType === "portrait") {
      return portraitImages[currentImageIndex];
    } else if (currentImageType === "landscape") {
      return landscapeImages[currentImageIndex];
    }
    return "";
  };

  const getCurrentImageList = () => {
    return currentImageType === "portrait" ? portraitImages : landscapeImages;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {landscapeImages.length > 0 && portraitImages.length <= landscapeImages.length && (
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-4">
            {landscapeImages.map((src, index) => (
              <LazyLoadImage
                key={index}
                className="w-full h-auto rounded-lg cursor-pointer"
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
          <div className="grid grid-cols-5 gap-4">
            {portraitImages.map((src, index) => (
              <LazyLoadImage
                key={index}
                className="w-full h-auto rounded-lg cursor-pointer"
                src={src}
                alt=""
                effect="blur"
                onClick={() => openLightbox(index, "portrait")}
              />
            ))}
          </div>
        </div>
      )}

      {landscapeImages.length > 0 && portraitImages.length > landscapeImages.length && (
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-4">
            {landscapeImages.map((src, index) => (
              <LazyLoadImage
                key={index}
                className="w-full h-auto rounded-lg cursor-pointer"
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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeLightbox}
          >
            <AiOutlineClose />
          </button>
          <button
            className="absolute left-5 text-white text-5xl"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>
          <LazyLoadImage
            src={getCurrentImageSrc()}
            alt=""
            className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
            effect="blur"
          />
          <button
            className="absolute right-5 text-white text-5xl"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
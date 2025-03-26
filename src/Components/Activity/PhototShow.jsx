import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaChevronRight, FaChevronLeft, AiOutlineClose } from "../icon";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function PhotoShow({ folderId }) {
    const [groupedImages, setGroupedImages] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [flatImages, setFlatImages] = useState([]); // 存放所有圖片的陣列

    useEffect(() => {
        setTimeout(() => { // 🔹 加入 500ms 延遲，避免 API 過載
            fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name)`)
                .then(response => response.json())
                .then(data => {
                    if (data.files) {
                        const imageUrls = data.files.map(file => ({
                            url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
                            id: file.id
                        }));
    
                        // 取得圖片尺寸後分類
                        const imageGroups = {};
                        let loadedCount = 0;
                        const allImages = [];
    
                        imageUrls.forEach(image => {
                            const img = new Image();
                            img.src = image.url;
                            img.onload = () => {
                                const sizeKey = `${img.naturalWidth}x${img.naturalHeight}`;
                                if (!imageGroups[sizeKey]) {
                                    imageGroups[sizeKey] = [];
                                }
                                imageGroups[sizeKey].push(image.url);
                                allImages.push(image.url);
    
                                loadedCount++;
                                if (loadedCount === imageUrls.length) {
                                    setGroupedImages(imageGroups);
                                    setFlatImages(allImages);
                                }
                            };
                        });
                    }
                })
                .catch(error => console.error("Error fetching images:", error));
        }, 500); // ⏳ 500ms 延遲
    }, [folderId]); // 依賴 `folderId`，當資料夾變更時重新執行
    

    // 打開 Lightbox 並設定當前圖片索引
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    // 關閉 Lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    // 切換到上一張圖片
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? flatImages.length - 1 : prevIndex - 1));
    };

    // 切換到下一張圖片
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === flatImages.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* 📸 圖片分組顯示 */}
            {Object.keys(groupedImages).map((sizeKey, idx) => (
                <div key={idx} className="mb-6">
                    <div className="grid grid-cols-5 gap-4">
                        {groupedImages[sizeKey].map((src, index) => (
                            <LazyLoadImage
                                key={index}
                                className="w-full h-auto rounded-lg cursor-pointer"
                                src={src}
                                alt=""
                                effect="blur" // 🚀 懶加載，載入時先模糊
                                onClick={() => openLightbox(flatImages.indexOf(src))}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* 🔍 Lightbox 放大顯示 */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    {/* 關閉按鈕 */}
                    <button
                        className="absolute top-5 right-5 text-white text-3xl font-bold"
                        onClick={closeLightbox}
                    >
                        <AiOutlineClose />
                    </button>

                    {/* 左箭頭 */}
                    <button
                        className="absolute left-5 text-white text-5xl"
                        onClick={prevImage}
                    >
                        <FaChevronLeft />
                    </button>

                    {/* 圖片 (加入 LazyLoadImage) */}
                    <LazyLoadImage
                        src={flatImages[currentImageIndex]}
                        alt=""
                        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                        effect="blur" // 🔥 讓燈箱圖片也支援懶加載
                    />

                    {/* 右箭頭 */}
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
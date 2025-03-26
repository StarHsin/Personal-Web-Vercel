import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { useEffect, useState } from "react";

const PARENT_FOLDER_ID = import.meta.env.VITE_PARENT_FOLDER_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function ActivityScraping({ onFolderClick }) {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetch(`https://www.googleapis.com/drive/v3/files?q='${PARENT_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`)
            .then(response => response.json())
            .then(data => {
                if (data.files) {
                    const folderPromises = data.files.map(folder =>
                        fetch(`https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png')&key=${API_KEY}&fields=files(id,name)&pageSize=4`)
                            .then(response => response.json())
                            .then(imgData => {
                                const images = imgData.files.map(file => `https://drive.google.com/thumbnail?id=${file.id}&sz=w500`);

                                // 🔹 預載圖片
                                return new Promise((resolve) => {
                                    let loadedCount = 0;
                                    images.forEach(src => {
                                        const img = new Image();
                                        img.src = src;
                                        img.onload = () => {
                                            loadedCount++;
                                            if (loadedCount === images.length) {
                                                resolve({ id: folder.id, name: folder.name, images });
                                            }
                                        };
                                        img.onerror = () => {
                                            loadedCount++;
                                            if (loadedCount === images.length) {
                                                resolve({ id: folder.id, name: folder.name, images });
                                            }
                                        };
                                    });

                                    // 🛑 如果沒有圖片，直接回傳
                                    if (images.length === 0) {
                                        resolve({ id: folder.id, name: folder.name, images });
                                    }
                                });
                            })
                    );

                    // 等所有圖片預載完成後才更新 `folders` 狀態
                    Promise.all(folderPromises).then(results => setFolders(results));
                }
            })
            .catch(error => console.error("Error fetching folders:", error));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {folders.map((folder, index) => (
                <button 
                    key={index} 
                    className="mb-6 w-full text-left flex flex-col justify-center items-center"
                    onClick={() => onFolderClick(folder.name, folder.id)}
                >
                    <div className="text-[2rem] font-bold text-white mb-2">{folder.name}</div>
                    <div className="grid grid-cols-4 gap-4">
                        {folder.images.map((src, idx) => (
                            <LazyLoadImage
                                key={idx}
                                className="w-full h-auto rounded-lg mb-4"
                                src={src}
                                alt=""
                                effect="blur" // 加入模糊過渡效果
                            />
                        ))}
                    </div>
                </button>
            ))}
        </div>
    );
}
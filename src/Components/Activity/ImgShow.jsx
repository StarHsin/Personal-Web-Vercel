import React, { useEffect, useState } from "react";

const FOLDER_ID = "1f9VHxWiUkwOgdHOEhUG5MkfzR44bdrLI";
const API_KEY = "AIzaSyAEHtvd1FDsgA8yfZXSL-PxOAb-U-mEmWs"; 

export default function ImgShow({ onFolderName }) {
    const [images, setImages] = useState([]);
    const [folderName, setFolderName] = useState("");

    useEffect(() => {
        // 取得資料夾名稱
        fetch(`https://www.googleapis.com/drive/v3/files/${FOLDER_ID}?key=${API_KEY}&fields=name&orderBy=modifiedTime desc
`)
            .then(response => response.json())
            .then(data => {
                if (data.name) {
                    setFolderName(data.name);
                }
            })
            .catch(error => console.error("Error fetching folder name:", error));

        // **取得圖片清單**
        fetch(`https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)&`)
            .then(response => response.json())
            .then(data => {
                if (data.files) {
                    const imageUrls = data.files.map(file => 
                        `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`
                    );
                    setImages(imageUrls);  // ✅ 設定圖片
                }
            })
            .catch(error => console.error("Error fetching images:", error));
    }, []);  // ✅ `useEffect` 確保只執行一次

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* 顯示圖片 */}
            <div className="grid grid-cols-4 gap-4" style={{ gridAutoFlow: "dense" }}>
                {images.slice(0, 4).map((src, index) => (
                    <div key={index}>
                        <img className="w-full h-auto rounded-lg" src={src} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );    
}
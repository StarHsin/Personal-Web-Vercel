import { useEffect, useState } from "react";
import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export default function LoadFirebaseImg({ path }) {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, path); // 參考到 Firebase Storage 中的圖片路徑
        const url = await getDownloadURL(imageRef);
        setBackgroundImageUrl(url);
      } catch (error) {
        console.error(
          "Error fetching background image from Firebase Storage:",
          error
        );
        // 您可以在這裡設定一個預設圖片 URL，以防載入失敗
      }
    };

    fetchImage();
  }, []);
  return (
    <img
      src={backgroundImageUrl}
      alt="背景圖片"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

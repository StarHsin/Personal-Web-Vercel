import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const PARENT_FOLDER_PATH = import.meta.env.VITE_FIREBASE_STORAGE_PARENT_FOLDER;

export default function ActivityScraping({ onFolderClick }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const listParentFolder = ref(storage, PARENT_FOLDER_PATH);

    listAll(listParentFolder)
      .then((res) => {
        const folderPromises = res.prefixes.map(async (folderRef) => {
          const folderName = folderRef.name;
          const folderImagesRef = ref(storage, `${PARENT_FOLDER_PATH}/${folderName}`);
          const imageListResult = await listAll(folderImagesRef);
          const imagePromises = imageListResult.items.slice(0, 4).map(async (itemRef) => {
            return await getDownloadURL(itemRef);
          });
          const images = await Promise.all(imagePromises);
          return { id: folderName, name: folderName, images };
        });

        Promise.all(folderPromises).then(results => {
          console.log("Fetched folders data:", results); // 👈 檢查這裡的輸出
          setFolders(results);
        });
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
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
            {folder.images.map((src, idx) => {
              console.log("Image URL:", src); // 👈 檢查這裡的輸出
              return (
                <LazyLoadImage
                  key={idx}
                  className="w-full h-auto rounded-lg mb-4"
                  src={src}
                  alt=""
                  effect="blur"
                />
              );
            })}
          </div>
        </button>
      ))}
    </div>
  );
}
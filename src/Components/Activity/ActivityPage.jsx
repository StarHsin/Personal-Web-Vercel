import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityScraping from "./ActivityScraping";
import StickyNavbar from "../StickyNavbar";
import { ref, listAll, getDownloadURL, list } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

const PARENT_FOLDER_PATH = "images/Activity Img";
const PREVIEW_IMAGE_COUNT = 4;

export default function ActivityPage() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true); // 可以加入 loading 狀態
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoldersAndPreviews = async () => {
      setLoading(true);
      setError(null);
      const activityImgRef = ref(storage, PARENT_FOLDER_PATH);

      try {
        const res = await listAll(activityImgRef);
        const folderPromises = res.prefixes.map(async (folderRef) => {
          const folderName = folderRef.name;
          const folderImagesRef = ref(
            storage,
            `${PARENT_FOLDER_PATH}/${folderName}`
          );
          const imageListResult = await list(folderImagesRef, {
            maxResults: PREVIEW_IMAGE_COUNT,
          });
          const imagePromises = imageListResult.items.map(
            async (itemRef) => await getDownloadURL(itemRef)
          );
          const images = await Promise.all(imagePromises);
          return { name: folderName, images };
        });
        const results = await Promise.all(folderPromises);
        setFolders([...results].reverse());
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoldersAndPreviews();
  }, []);

  const handlePhotos = (folderName) => {
    navigate("/Activity/Photos", { state: { folderName } });
  };

  if (loading) {
    return (
      <nav className="absolute w-full pt-20 bg-slate-800">
        <StickyNavbar />
        <div className="w-full max-w-3xl mx-auto p-4 flex justify-center items-center text-white">
          載入中...
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="absolute w-full pt-20 bg-slate-800">
        <StickyNavbar />
        <div className="w-full max-w-3xl mx-auto p-4 flex justify-center items-center text-red-500">
          載入資料失敗：{error.message}
        </div>
      </nav>
    );
  }

  return (
    <nav className="absolute w-full pt-20 bg-slate-800">
      <StickyNavbar />
      <div className="w-full max-w-3xl mx-auto p-4 flex flex-col justify-center items-center">
        <ActivityScraping folders={folders} onFolderClick={handlePhotos} />
      </div>
    </nav>
  );
}

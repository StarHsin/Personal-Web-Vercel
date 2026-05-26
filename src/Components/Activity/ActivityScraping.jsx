import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React from "react";

export default function ActivityScraping({ folders, onFolderClick }) {
  return (
    <div className="mx-auto w-full max-w-5xl p-1 sm:p-4">
      {folders.map((folder, index) => {
        const displayedFolderName = folder.name.startsWith("00")
          ? folder.name.slice(2)
          : folder.name;

        return (
          <button
            key={index}
            className="mb-8 flex w-full flex-col items-center justify-center text-left"
            onClick={() => onFolderClick(folder.name)}
          >
            <div className="mb-3 max-w-full break-words text-center text-2xl font-bold text-white sm:text-[2rem]">
              {displayedFolderName}
            </div>
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {folder.images.map((src, idx) => (
                <LazyLoadImage
                  key={idx}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
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

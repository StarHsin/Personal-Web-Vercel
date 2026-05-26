// Lightbox.js
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaChevronRight, FaChevronLeft, AiOutlineClose } from "../icon";

export default function Lightbox({
  isOpen,
  images,
  onClose,
  initialIndex,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex || 0);

  useEffect(() => {
    setCurrentImageIndex(initialIndex || 0);
  }, [initialIndex, isOpen]);

  if (!isOpen) {
    return null;
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImageSrc = images[currentImageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-12 py-16 sm:px-20">
      <button
        className="absolute right-4 top-4 z-10 text-3xl font-bold text-white sm:right-5 sm:top-5"
        onClick={onClose}
      >
        <AiOutlineClose />
      </button>
      <button
        className="absolute left-2 z-10 text-3xl text-white sm:left-5 sm:text-5xl"
        onClick={prevImage}
      >
        <FaChevronLeft />
      </button>
      <LazyLoadImage
        src={currentImageSrc}
        alt=""
        className="max-h-[82svh] max-w-full rounded-lg object-contain shadow-lg"
        effect="blur"
      />
      <button
        className="absolute right-2 z-10 text-3xl text-white sm:right-5 sm:text-5xl"
        onClick={nextImage}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

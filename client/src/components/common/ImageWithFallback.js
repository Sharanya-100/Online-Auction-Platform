import React, { useEffect, useState } from "react";

/**
 * Displays an image and switches to fallbackSrc if the primary image fails.
 */
const ImageWithFallback = ({ src, fallbackSrc, alt = "Image", ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [usingFallback, setUsingFallback] = useState(!src);

  // Update image when src changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setUsingFallback(false);
    } else {
      setImgSrc(fallbackSrc);
      setUsingFallback(true);
    }
  }, [src, fallbackSrc]);

  const fixUrl = (url) => {
    if (!url) {
      return "";
    }

    // External URL
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("data:") ||
      url.startsWith("blob:")
    ) {
      return url;
    }

    // Backend uploaded files
    if (url.startsWith("/uploads/")) {
      return `https://online-auction-platform-pqdh.onrender.com${url}`;
    }

    if (url.startsWith("uploads/")) {
      return `https://online-auction-platform-pqdh.onrender.com/${url}`;
    }

    // Files beginning with / are assumed to be in React's public folder
    if (url.startsWith("/")) {
      return url;
    }

    // Other relative paths are assumed to come from backend
    return `https://online-auction-platform-pqdh.onrender.com/${url}`;
  };

  const handleError = () => {
    // Primary image failed -> try fallback
    if (!usingFallback && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setUsingFallback(true);
    }
  };

  return (
    <img src={fixUrl(imgSrc)} alt={alt} onError={handleError} {...props} />
  );
};

export default ImageWithFallback;

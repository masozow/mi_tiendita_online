import { useState } from "react";

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  width = "100%",
  objectFit = "cover",
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      style={{ width, objectFit }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;

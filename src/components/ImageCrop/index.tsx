import { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

interface CropImageProps {
  image: string;
}

const ImageCropper = ({ image }: CropImageProps) => {
  const [output, setOutput] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

  const handleCropImageNow = (crop: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => {
    const canvas = document.createElement("canvas");
    const imgElement = document.createElement("img");
    imgElement.src = image;
    const scaleX = imgElement.naturalWidth / imgElement.width;
    const scaleY = imgElement.naturalHeight / imgElement.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");

    ctx.drawImage(
      imgElement,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
  };

  return (
    <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => setCrop(percentCrop)}
      ruleOfThirds
      keepSelection
      onComplete={crop => handleCropImageNow(crop)}
    >
      <img
        src={image}
        alt="test"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </ReactCrop>
  );
};

export default ImageCropper;

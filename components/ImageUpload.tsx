"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// Fixed: Remove parameter that ImageKit doesn't provide
const authenticator = async () => {
  try {
    console.log(
      "Authenticating with:",
      `${config.env.apiEndpoint}/api/auth/imagekit`,
    );

    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Auth failed:", response.status, errorText);

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("Auth success:", data);
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// Fixed: Add proper interface and prop
interface ImageUploadProps {
  onFileChange?: (filePath: string) => void;
}

const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Upload error details:", error);
    toast.error("Failed to upload image", {
      variant: "destructive",
      description: error?.message || "Please check your file and try again",
    });
  };

  const onSuccess = (res: any) => {
    console.log("Upload success:", res);
    setFile(res);
    onFileChange?.(res.filePath);

    toast.success("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;

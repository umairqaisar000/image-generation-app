"use client"

import { cropImage } from "@/utils/imageUtils";
import { ref, set } from "firebase/database";
import { useState } from "react";
import GradientButton from "./components/gradientButton";
import useAuth from "./hooks/userAuth";
import { database } from "./utils/firebase";


export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const generateImage = async () => {
    try {
      setIsLoading(true);
      setImageUrl("");



      if (!user) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`/api/proxy?prompt=${encodeURIComponent(prompt)}`);
      if (response.ok) {
        const blob = await response.blob();
        const croppedBlob = await cropImage(blob, 60);

        const formData = new FormData();
        formData.append('file', croppedBlob);
        formData.append('upload_preset', 'gen_images'); // Replace with your upload preset

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }

        const uploadResult = await uploadResponse.json();
        const imageUrl = uploadResult.secure_url;
        setImageUrl(imageUrl);

        // Save image URL to Firebase
        const imageRef = ref(database, `images/${user.uid}/${imageUrl}`);
        await set(imageRef, { url: imageUrl });
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pt-28 pb-10 mt-12">
        <h1 className="mb-10 text-center text-5xl text-white">Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-purple-500 via-blue-600 to-cyan-300 font-bold">Visuals</span> with Real-Time <br></br> Image Generation in seconds</h1>
        <div className="relative mx-96">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <img src="stars.png"></img>
          </div>
          <input type="text" placeholder="Enter a prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="block w-full p-4 ps-16 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 dark:bg-opacity-50 dark:bg-neutral-900  dark:border-gray-600 dark:placeholder-neutral-400 dark:text-white" />
          {/* <button type="submit" onClick={generateImage} disabled={isLoading} className="text-white absolute end-0 bottom-0 bg-gradient-to-br from-purple-400 via-blue-700 to-white-200 px-4 py-2 hover:bg-gradient-to-bl font-medium focus:ring-4  text-sm focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2"</button> */}
          <GradientButton onClick={generateImage} isLoading={isLoading} text={isLoading ? "Generating..." : "Generate Image"} className="absolute end-0 bottom-0  me-2 mb-2" />
        </div>

      </div>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      {imageUrl && !isLoading && (
        <div className="my-16 flex justify-center">
          <img src={imageUrl} alt="Generated Image" className="rounded-[2%] shadow-lg border-gray-500 border" />
        </div>
      )}
    </>
  );
}

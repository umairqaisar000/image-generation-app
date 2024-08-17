"use client"

import { cropImage } from "@/utils/imageUtils";
import { useState } from "react";
import Navbar from "./components/navbar";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateImage = async () => {
    setIsLoading(true);
    setImageUrl("");

    try {
      const response = await fetch(`/api/proxy?prompt=${encodeURIComponent(prompt)}`);
      if (response.ok) {
        const blob = await response.blob();
        const croppedBlob = await cropImage(blob, 60);
        const imageUrl = URL.createObjectURL(croppedBlob);
        setImageUrl(imageUrl);
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
    <main>
      <Navbar />
      <div className="pt-28 pb-10 mt-28">
        <h1 className="mb-10 text-center text-5xl">Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-purple-500 via-blue-600 to-cyan-300 font-bold">Visuals</span> with Real-Time <br></br> Image Generation in seconds</h1>
        <div className="relative mx-96">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <img src="stars.png"></img>
          </div>
          <input type="text" placeholder="Enter a prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="block w-full p-4 ps-16 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button type="submit" onClick={generateImage} disabled={isLoading} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? "Generating..." : "Generate Image"}</button>
        </div>

      </div>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      {imageUrl && !isLoading && (
        <div className="mt-16 flex justify-center">
          <img src={imageUrl} alt="Generated Image" className="rounded-[2%] shadow-lg border-gray-500 border" />
        </div>
      )}
    </main>
  );
}

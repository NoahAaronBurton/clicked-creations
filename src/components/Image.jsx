
import React, { useState } from 'react';
import axios from 'axios';
import fs from 'fs';
const api = import.meta.env.VITE_API_URL;

const ImageForm = () => {
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState('standard');
  const [size, setSize] = useState('1792x1024');
  const [style, setStyle] = useState('vivid');
  const [image, setImage] = useState(null); // Base64 string
  const [imgloading, setImgLoading] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleSubmit = async (e) => {
    setImgLoading(true);
    try {
    console.log('submitting img request');
    e.preventDefault();
    const url = api + '/image/generate';
    const {data} = await axios.post(url, {
      prompt: prompt,
      quality: quality,
      size: size,
      style: style
    },
    { withCredentials: true });
    // console.log(data);
    // Create a data URL from the Base64 string
    const imageUrl = `data:image/jpeg;base64,${data.data[0].b64_json}`;

    setImgLoading(false);
    setImage(imageUrl);
    // console.log('image:', imageUrl);
} catch (error) {
  setImgLoading(false);
    console.log(error);
}
  };

  // download image from binary json
  const handleDownload = async (e) => {
    e.preventDefault();
  
    try {
      // Remove the data URL prefix and decode the Base64 string
      const base64String = image.replace('data:image/jpeg;base64,', '');
      const binaryString = atob(base64String);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes.buffer], {type: 'image/jpeg'});
  
      // Create an object URL for the Blob and initiate a download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mx-auto  h-[75vh] p-2 sm:4/4 md:w-3/4'>
        <h1 className='text-4xl mb-4'>Image Generator</h1>
        <p className='mb-5'>Complete the Prompt below and click Submit to generate an image! </p>
        {image && <img src={image} alt="generated image" />}
        {!image && size === '1024x1024' && <img src="https://via.placeholder.com/1024x1024" alt="placeholder" />}
        {!image && size === '1792x1024' && <img src="https://via.placeholder.com/1792x1024" alt="placeholder" />}
        {!image && size === '1024x1792' && <img src="https://via.placeholder.com/1024x1792" alt="placeholder" />}
      {imgloading && <div className='flex justify-center bg-blue-400 w-full'>Loading...</div>}
    <form className='flex flex-col bg-grey-800' onSubmit={handleSubmit}>
      <div className='flex ' >
        <label className='mr-2 font-bold ' htmlFor="prompt">Prompt:</label>
        <textarea className='w-full bg-transparent ring-2' type="text" id="prompt" value={prompt} onChange={handlePromptChange} />
      </div>
      <div className='flex '>
        <label className='mr-2 font-bold' htmlFor="quality">Quality:</label>
        <select className='ml-2 bg-transparent' id="quality" value={quality} onChange={handleQualityChange}>
          <option value="standard">Standard</option>
          <option value="hd">HD</option>
        </select>
      </div>
      <div className='flex ' >
        <label className='mr-2 font-bold' htmlFor="size">Size:</label>
        <select className='ml-2 bg-transparent' id="size" value={size} onChange={handleSizeChange}>
          <option value="1024x1024">1024x1024</option>
          <option value="1792x1024">1792x1024</option>
          <option value="1024x1792">1024x1792</option>
        </select>
      </div>
      <div className='flex ' >
        <label className='mr-2 font-bold' htmlFor="style">Style:</label>
        <select className='ml-2 bg-transparent' id="style" value={style} onChange={handleStyleChange}>
          <option value="vivid">Vivid</option>
          <option value="natural">Natural</option>
        </select>
      </div>
    </form>
    <div className='flex flex-col space-y-2 justify-center'>
      {!imgloading && <button className='rounded full text-white bg-gradient-to-r from-green-500 to-red-500 mt-4' type="submit" onClick={handleSubmit}>Submit</button>}
      {image && <button className='rounded full text-white bg-gradient-to-r from-blue-500 to-red-500' onClick={handleSubmit}>Regenerate</button>}
      {image && <button className='rounded full text-white w-full bg-gradient-to-r from-purple-500 to-orange-500' onClick={handleDownload}>Download Image</button>}
    </div>  

    </div>
  );
};

export default ImageForm;

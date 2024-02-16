
import React, { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;

const ImageForm = () => {
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState('standard');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState('vivid');
  const [image, setImage] = useState(null);

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
    console.log(data);
    setImage(data.data[0].url);
    console.log('image:', image);
} catch (error) {
    console.log(error);
}
  };

  return (
    <div className='container mx-auto  h-[75vh] sm:4/4 md:w-3/4'>
        <h1 className='text-4xl'>Image Generator</h1>
        <p className='mb-5'>Complete the Prompt below and click Submit to generate an image! </p>
        {image && <img src={image} alt="generated image" />}
        {!image && size === '1024x1024' && <img src="https://via.placeholder.com/1024x1024" alt="placeholder" />}
        {!image && size === '1792x1024' && <img src="https://via.placeholder.com/1792x1024" alt="placeholder" />}
        {!image && size === '1024x1792' && <img src="https://via.placeholder.com/1024x1792" alt="placeholder" />}
    <form className='grid grid-cols-2 bg-slate-100' onSubmit={handleSubmit}>
      <div className='flex justify-center' >
        <label htmlFor="prompt">Prompt:</label>
        <input className='w-full' type="text" id="prompt" value={prompt} onChange={handlePromptChange} />
      </div>
      <div className='flex justify-center'>
        <label htmlFor="quality">Quality:</label>
        <select id="quality" value={quality} onChange={handleQualityChange}>
          <option value="standard">Standard</option>
          <option value="hd">HD</option>
        </select>
      </div>
      <div className='flex justify-center' >
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={handleSizeChange}>
          <option value="1024x1024">1024x1024</option>
          <option value="1792x1024">1792x1024</option>
          <option value="1024x1792">1024x1792</option>
        </select>
      </div>
      <div className='flex justify-center' >
        <label htmlFor="style">Style:</label>
        <select id="style" value={style} onChange={handleStyleChange}>
          <option value="vivid">Vivid</option>
          <option value="natural">Natural</option>
        </select>
      </div>
    </form>
      <button className='rounded full text-white w-full bg-gradient-to-r from-green-500 to-red-500' type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ImageForm;

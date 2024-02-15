
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
    <div>
        <h1 className='text-4xl mb-5'>Image Generator</h1>
        {image && <img className='' src={image} alt="generated image" />}
        
    <form className='bg-slate-100' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input type="text" id="prompt" value={prompt} onChange={handlePromptChange} />
      </div>
      <div>
        <label htmlFor="quality">Quality:</label>
        <select id="quality" value={quality} onChange={handleQualityChange}>
          <option value="standard">Standard</option>
          <option value="hd">HD</option>
        </select>
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={handleSizeChange}>
          <option value="1024x1024">1024x1024</option>
          <option value="1792x1024">1792x1024</option>
          <option value="1024x1792">1024x1792</option>
        </select>
      </div>
      <div>
        <label htmlFor="style">Style:</label>
        <select id="style" value={style} onChange={handleStyleChange}>
          <option value="vivid">Vivid</option>
          <option value="natural">Natural</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ImageForm;

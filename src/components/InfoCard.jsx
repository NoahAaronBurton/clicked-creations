import React from 'react';

const InfoCard = ({ imageSrc, header, info }) => {
  return (
    <div className="mt-4 p-8">
      <img className='p-6 w-80 h-auto' src={imageSrc} alt={header} />
      <h2>{header}</h2>
      <p className='text-white'>{info}</p>
    </div>
  );
};

export default InfoCard;

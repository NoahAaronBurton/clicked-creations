import React from 'react';

const InfoCard = ({ imageSrc, header, info }) => {
  return (
    <div className="mt-4 p-8">
      <img className='p-6' src={imageSrc} alt={header} />
      <h2>{header}</h2>
      <p>{info}</p>
    </div>
  );
};

export default InfoCard;

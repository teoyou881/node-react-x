import React from 'react';

const ImageUpload = ({ field }) => {
  const onChange = (e) => {
    const file = e.target.files[0];
    field.onChange(file);
  };

  return <input type="file" accept="image/*" onChange={onChange} />;
};

export default ImageUpload;

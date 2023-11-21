import React from 'react';
import PropTypes from 'prop-types';

const ImageUpload = ({ field }) => {
  const onChange = (e) => {
    const file = e.target.files[0];
    field.onChange(file);
  };

  return <input type="file" accept="image/*" onChange={onChange} />;
};

ImageUpload.propTypes = {
  field: PropTypes.object.isRequired,
};

export default ImageUpload;

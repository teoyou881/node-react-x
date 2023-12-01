import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagesZoom from './ImagesZoom';

const Wrapper = styled.div`
  width: calc(100% - 20px) !important;
  display: flex !important;
  height: 300px;
  margin: 10px auto;
  justify-content: space-around;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

const WrapperFor2 = styled.div`
  width: calc(100% - 20px) !important;
  height: 300px;
  margin: 10px auto;
  display: flex !important;
  justify-content: space-around;

  & > img {
    width: 49%;
    object-fit: cover;
  }
`;
const WrapperFor3 = styled.div`
  width: calc(100% - 20px) !important;
  height: 300px;
  margin: 10px auto;
  display: flex !important;
  justify-content: space-around;

  & > div {
    width: 49%;
  }
`;
const WrapperFor4 = styled.div`
  width: calc(100% - 20px) !important;
  height: 300px;
  margin: 10px auto;
  display: flex !important;
  flex-direction: column;
  justify-content: space-around;
  & > div {
    height: 49%;
  }
`;

const WrapperVer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
    }
  }, []);
  if (images.length === 1) {
    return (
      <Wrapper>
        <img role="presentation" src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </Wrapper>
    );
  }
  if (images.length === 2) {
    return (
      <WrapperFor2>
        <img role="presentation" src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" src={`${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </WrapperFor2>
    );
  }
  if (images.length === 3) {
    return (
      <WrapperFor3>
        <div>
          <img
            role="presentation"
            src={`${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          {' '}
          <img
            role="presentation"
            src={`${images[1].src}`}
            alt={images[1].src}
            onClick={onZoom}
            style={{ height: '49%' }}
          />
          <img
            role="presentation"
            src={`${images[2].src}`}
            alt={images[2].src}
            onClick={onZoom}
            style={{ height: '49%' }}
          />
        </div>

        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </WrapperFor3>
    );
  }
  // if the number of images is 4, default return
  return (
    <WrapperFor4>
      <WrapperVer>
        <img
          role="presentation"
          src={`${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          style={{ width: '49%' }}
        />
        <img
          role="presentation"
          src={`${images[1].src}`}
          alt={images[1].src}
          onClick={onZoom}
          style={{ width: '49%' }}
        />
      </WrapperVer>
      <WrapperVer>
        <img
          role="presentation"
          src={`${images[2].src}`}
          alt={images[2].src}
          onClick={onZoom}
          style={{ width: '49%' }}
        />
        <img
          role="presentation"
          src={`${images[3].src}`}
          alt={images[3].src}
          onClick={onZoom}
          style={{ width: '49%' }}
        />
      </WrapperVer>

      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </WrapperFor4>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;

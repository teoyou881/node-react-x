import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const buttonRef = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const uploadInput = useRef();

  const onSubmit = useCallback(() => {
    // This code is user just send text
    // dispatch(postAction.addPostRequest(text));

    const formData = new FormData();
    imagePaths.forEach((v) => {
      formData.append('image', v);
    });
    formData.append('content', text);
    dispatch(postAction.addPostRequest(formData));

    // If there is an error on backend, the text will be cleared.
    // So, setText() should be called in useEffect.
    // setText("");
  }, [text, imagePaths]);
  const showFileUploader = useCallback(() => {
    // access input through dom
    // document.getElementById("inputFileUpload").click();

    // access input using ref
    uploadInput.current.click();
  }, [uploadInput.current]);

  // After user choosing images, onChange function will be called once user click confirm btn.
  const onChangeImages = useCallback(
    (e) => {
      const { files } = e.target;
      if (files.length > 4) {
        alert('You can upload up to 4 images.');
        if (uploadInput.current) {
          uploadInput.current.value = '';
        }
      } else {
        const imageFormData = new FormData();
        // e.target.files is not an array, but it is like an array.
        // So, we can't use forEach() method.
        // Instead, we can use Array.prototype.forEach.call() method.
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);
        });
        dispatch(postAction.uploadImagesRequest(imageFormData));
      }
    },
    [uploadInput.current],
  );

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(postAction.removeImage(index));
    },
    [],
  );

  return (
    <div
      style={{
        width: 'inherit',
        margin: 'inherit',
      }}
    >
      <Form encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          rows={6}
          placeholder="what happened?"
          style={{
            resize: 'none',
          }}
        />
        <div>
          <input
            type="file"
            id="inputFileUpload"
            multiple
            hidden
            style={{ display: 'none' }}
            ref={uploadInput}
            name="image"
            onChange={onChangeImages}
          />
          <Button onClick={showFileUploader} style={{ marginTop: '6px' }}>
            image upload
          </Button>
          <Button
            type="primary"
            style={{ float: 'right', marginTop: '6px' }}
            htmlType="submit"
            ref={buttonRef}
            disabled={!(text || imagePaths.length > 0)}
          >
            Post
          </Button>
        </div>
        <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: 'inline-block' }}>
              {/* change img url from thumb to original to show img */}
              {/* When using the REPLACE function, if you want to specify a pattern as a regular expression,
                you must enclose it in forward slashes (/).
                Because the slash has special meaning in regular expressions,
                it may need to be escaped. */}
              <img src={v.replace(/\/thumb\//, '/original/')} alt={v} style={{ width: '200px' }} />
              <div>
                {/*
                If you want to put data inside a higher-order function,
                make it a higher-order function.
                */}
                <Button onClick={onRemoveImage(i)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default PostForm;

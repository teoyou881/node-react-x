import React, { useCallback, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../reducers/post";

const PostForm = () => {
    const imagePaths = useSelector((state) => state.post.imagePaths);
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const uploadInput = useRef();

    const onSubmit = useCallback(() => {
        dispatch(postAction.addPost());
        setText("");
    }, []);
    const showFileUploader = useCallback(() => {
        // access input through dom
        // document.getElementById("inputFileUpload").click();

        // access input using ref
        uploadInput.current.click();
    }, [uploadInput.current]);
    return (
        <div>
            <Form
                style={{ margin: "10px 0 20px" }}
                encType={"multipart/form-data"}
                onFinish={onSubmit}
            >
                <Input.TextArea
                    value={text}
                    onChange={onChangeText}
                    maxlength={140}
                    placeholder="what happened?"
                />
                <div>
                    <input
                        type="file"
                        id="inputFileUpload"
                        multiple
                        hidden
                        style={{ display: "none" }}
                        ref={uploadInput}
                    />
                    <Button onClick={showFileUploader}>image upload</Button>
                    <Button
                        type={"primary"}
                        style={{ float: "right" }}
                        htmlType={"submit"}
                    >
                        Lol
                    </Button>
                </div>
                <div>
                    {imagePaths.map((v) => (
                        <div key={v} style={{ display: "inline-block" }}>
                            <img src={v} alt={v} style={{ width: "200px" }} />
                            <div>
                                <Button>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </div>
    );
};

export default PostForm;

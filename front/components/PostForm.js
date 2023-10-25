import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../reducers/post";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import useGetForms from "../utils/useCommentForms";
import FileUploadForm from "../utils/fileUploadForm";

const PostForm = () => {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    // try to change the way to use react-hook-form
    /*
	const { fileUploadField } = useGetForms({
		control,
	});
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
*/
    useEffect(() => {
        if (addPostDone) {
            setText("");
        }
    }, [addPostDone]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const uploadInput = useRef();

    const onSubmit = useCallback(() => {
        dispatch(postAction.addPostRequest(text));

        // If there is an error on backend, the text will be cleared.
        // So, setText() should be called in useEffect.
        // setText("");
    }, [text]);
    const showFileUploader = useCallback(() => {
        // access input through dom
        // document.getElementById("inputFileUpload").click();

        // access input using ref
        uploadInput.current.click();
    }, [uploadInput.current]);

    return (
        <div
            style={{
                width: "inherit",
                margin: "inherit",
            }}
        >
            <Form encType={"multipart/form-data"} onFinish={onSubmit}>
                <Input.TextArea
                    value={text}
                    onChange={onChangeText}
                    maxLength={140}
                    rows={6}
                    placeholder="what happened?"
                    style={{
                        resize: "none",
                    }}
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
                    <Button
                        onClick={showFileUploader}
                        style={{ marginTop: "6px" }}
                    >
                        image upload
                    </Button>
                    <Button
                        type={"primary"}
                        style={{ float: "right", marginTop: "6px" }}
                        htmlType={"submit"}
                    >
                        Post
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

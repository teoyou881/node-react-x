import React from "react";
import { Button, Form } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { userAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostCard from "./PostCard";
const CommentForm = ({ post }) => {
    const userId = useSelector((state) => state.user.me?.id);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm({ mode: "onChange" });
    const onFormSubmit = (data) => {
        console.log(userId, data.comment);
    };
    const onErrors = (errors) => console.error(errors);

    return (
        <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
            <Form.Item style={{ margin: "10px 0 3px" }}>
                <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    style={{
                        width: "100%",
                        resize: "none",
                        boxSizing: "border-box",
                        border: "solid 1px #D9D9D9",
                        borderRadius: " 8px",
                        padding: "4px 11px",
                    }}
                    {...register("comment", {
                        required: true,
                    })}
                />
            </Form.Item>
            <Form.Item style={{ margin: "0px" }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ float: "right" }}
                    // If there is nothing in textArea, make button disabled.
                    disabled={!isDirty || errors.comment}
                >
                    Reply
                </Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.shape({
            id: PropTypes.number,
            nickname: PropTypes.string,
        }),
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default CommentForm;

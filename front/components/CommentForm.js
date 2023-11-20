import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { postAction } from '../reducers/post';
import useGetForms from '../utils/useCommentForms';
const CommentForm = ({ post, single = false }) => {
  const { addCommentDone } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    if (addCommentDone) {
      reset({
        comment: '',
      });
    }
  }, [addCommentDone]);

  const { handleSubmit, reset, control } = useForm({ mode: 'onChange', defaultValues: { comment: '' } });
  const onFormSubmit = (data) => {
    if (!single) {
      dispatch(
        postAction.addCommentRequest({
          postId: post.id,
          content: data.comment,
        }),
      );
    } else {
      dispatch(
        postAction.addCommentRequest({
          postId: post.id,
          content: data.comment,
          single: true,
        }),
      );
    }
  };
  const onErrors = (errors) => console.error(errors);
  const { commentField, commentDirtyFields } = useGetForms({
    control,
  });
  return (
    <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
      <Form.Item style={{ margin: '10px 0 3px' }}>
        <Input.TextArea
          onChange={commentField.onChange}
          value={commentField.value}
          maxLength={140}
          style={{
            resize: 'none',
            height: '142px',
          }}
        />
      </Form.Item>
      <Form.Item style={{ margin: '0px' }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right' }}
          // If there is nothing in textArea, make button disabled.
          disabled={!commentDirtyFields.comment || !commentField}
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

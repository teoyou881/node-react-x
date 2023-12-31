import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const DivWrapper = styled.div`
  margin-bottom: 10px;
`;

const NicknameEditForm = () => {
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const dispatch = useDispatch();
  const onSearch = useCallback(() => {
    dispatch(userAction.changeNicknameRequest(nickname));
    setNickname('');
  }, [nickname]);
  return (
    <DivWrapper>
      <Form>
        <Input.Search
          addonBefore="nickname"
          enterButton="edit"
          value={nickname}
          onChange={onChangeNickname}
          onSearch={onSearch}
        />
      </Form>
    </DivWrapper>
  );
};

export default NicknameEditForm;

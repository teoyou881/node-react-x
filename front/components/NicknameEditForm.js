import { Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const DivWrapper = styled.div`
    margin-bottom: 20px;
    border: 1px solid #d9d9d9;
    padding: 20px;
`;

const NicknameEditForm = () => {
    return (
        <DivWrapper>
            <Form>
                <Input.Search addonBefore='nickname' enterButton='edit' />
            </Form>
        </DivWrapper>
    );
};

export default NicknameEditForm;

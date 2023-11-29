import { Button, Form } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
// {} === {} --> false
// that's why we sholudn't use <div style={{}}></div>
// it is recommended that use sytled, as shown below.
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin: 10px auto;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Label = styled.label`
  width: 100%;
  margin: 0 auto;
  display: inline-block;
  @media screen and (max-width: 1200px) {
    text-align: center;
    font-size: 20px !important;
  }
`;
const Input = styled.input`
  width: 90%;
  display: inline-block;
  @media screen and (max-width: 1200px) {
    margin: 0 auto;
  }
`;

// TypeError: Cannot read properties of null (reading 'useMemo')
// IDK why
// const style = useMemo(() => ({
//         marginTop: 10,
//     }),
//     []
// );

const LoginForm = () => {
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const signUp = () => {
    dispatch(userAction.signUpDoneReset());
  };

  // TODO: deals with dummy data after connecting with backend
  const onFormSubmit = (data) => {
    dispatch(userAction.loginRequest(data));
  };
  const onErrors = (errors) => console.error(errors);

  return (
    // use obFinish instead of onSubmit
    // onFinish has already applied e.preventDefault();
    <div className="formWrapper">
      <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
        <InputWrapper>
          <Label htmlFor="email">email</Label>

          <Input id="email" name="email" {...register('email')} />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">password</Label>

          {/*
          do not use <Input> form antd if you want to use react-form-hook
          Because there is no name attribute in antd Input
          */}
          <Input id="password" name="password" type="password" required {...register('password')} />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            type="primary"
            htmlType="submit"
            loading={logInLoading}
            disabled={isSubmitting}
            style={{ marginRight: '5px' }}
          >
            Sign In
          </Button>
          <Link href="/signup">
            <Button onClick={signUp}>Sign Up</Button>
          </Link>
        </ButtonWrapper>
      </Form>
    </div>
  );
};
export default LoginForm;

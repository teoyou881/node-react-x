import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Button } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../reducers/user';
import { useRouter } from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const ErrorSpanWrapper = styled.div`
  color: red;
`;
const ButtonWrapper = styled.div`
  margin: auto;
  padding-top: 10px;
  display: table;
  text-align: center;
`;
const InputWrapper = styled.input`
  width: 100%;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (signUpDone || me) {
      router.push('/');
    }
  }, [signUpDone, me]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const userEmail = {
    required: 'Enter your e-mail address',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Wrong or invalid e-mail address. Please correct it and try again. ',
    },
  };
  const userNickname = {
    required: 'Enter your name',
  };
  const userPassword = {
    required: 'Enter your password',
    minLength: {
      value: 6,
      message: 'Minimum 6 characters required',
    },
  };
  const passwordConfirm = {
    required: true,
    validate: (value) => {
      if (watch('password') != value) {
        return 'Your password does not match';
      }
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
    reset,
    watch,
  } = useForm({ mode: 'onBlur' });

  const onFormSubmit = (data) => {
    dispatch(userAction.signUpRequest(data));
    reset();
  };
  const onErrors = (errors) => {
    console.error(errors);

    if (errors['password-confirm']) {
      console.error(errors['password-confirm']?.message);
      resetField('password-confirm');
    }
    if (errors.term) {
      alert(errors.term.message);
    }
  };

  return (
    <>
      <Head>
        <title>NodeX | Sign Up</title>
      </Head>
      <AppLayout>
        <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
          <div>
            <label htmlFor="email">email</label>
            <br />
            <InputWrapper id="email" name="email" {...register('email', userEmail)} />
          </div>
          {errors.email && (
            <ErrorSpanWrapper>
              <span>{errors.email?.message}</span>
            </ErrorSpanWrapper>
          )}
          <div>
            <label htmlFor="nickname">nickname</label>
            <br />
            <InputWrapper id="nickname" name="nickname" {...register('nickname', userNickname)} />
          </div>
          {errors.nickname && (
            <ErrorSpanWrapper>
              <span>{errors.nickname?.message}</span>
            </ErrorSpanWrapper>
          )}
          <div>
            <label htmlFor="password">password</label>
            <br />
            <InputWrapper
              id="password"
              name="password"
              type="password"
              required
              {...register('password', userPassword)}
            />
          </div>
          {errors.password && (
            <ErrorSpanWrapper>
              <span>{errors.password?.message}</span>
            </ErrorSpanWrapper>
          )}
          <div>
            <label htmlFor="password-confirm">password confirm</label>
            <br />
            <InputWrapper
              id="password-confirm"
              name="password-confirm"
              type="password"
              required
              {...register('password-confirm', passwordConfirm)}
            />
            {errors['password-confirm'] && (
              <ErrorSpanWrapper>
                <span>{errors['password-confirm'].message}</span>
              </ErrorSpanWrapper>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              style={{
                verticalAlign: 'middle',
                textAlign: 'center',
                width: '100%',
              }}
              {...register('term', {
                required: 'You must agree to our terms of service',
              })}
              className="mx-3"
            />
            <span
              style={{
                display: 'table',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              I have read and agree to the terms of service
            </span>
            {/* {errors.term && (
                            <ErrorSpanWrapper>
                                <span>{errors.term?.message}</span>
                            </ErrorSpanWrapper>
                        )} */}
          </div>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit" loading={signUpLoading} disabled={isSubmitting}>
              Sign Up
            </Button>
            <Link href="/">
              <Button>Sign In</Button>
            </Link>
          </ButtonWrapper>
        </Form>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch(userAction.loadMyInfoRequest());
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;

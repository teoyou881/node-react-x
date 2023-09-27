import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import styled from 'styled-components';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ mode: 'onChange' });

    const onFormSubmit = (data) => {
        console.log(data);
    };
    const onErrors = (errors) => console.error(errors);

    // const onChangeId = useCallback((e) => {
    //     setEmail(e.target.value);
    // }, []);
    // const onChangePassword = useCallback((e) => {
    //     setPassword(e.target.value);
    // }, []);

    return (
        // use obFinish instead of onSubmit
        <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
            <div>
                <label htmlFor='user-email'>email</label>
                <br />
                <input id='user-email' name='user-email' {...register('user-email')} />
            </div>
            <div>
                <label htmlFor='user-password'>password</label>
                <br />
                {/* do not use <Input> form antd
                    if you want to use react-form-hook
                    becasue there is no name attribute in antd Input  */}
                <input
                    id='user-password'
                    name='user-password'
                    type='password'
                    required
                    {...register('user-password')}
                />
            </div>
            <div>
                <Button type='primary' htmlType='submit' loading={false} disabled={isSubmitting}>
                    Log In
                </Button>
                <Link href='/signup'>
                    <Button>회원가입</Button>
                </Link>
            </div>
        </Form>
    );
};

export default LoginForm;

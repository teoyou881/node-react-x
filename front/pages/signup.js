import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Button } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';

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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        resetField,
        reset,
        watch,
    } = useForm({ mode: 'onChange' });

    const onFormSubmit = ({ email, nickname, password }) => {
        console.log(email, nickname, password);
    };
    const onErrors = (errors) => {
        console.error(errors);

        if (errors['password-confirm']) {
            console.error(errors['password-confirm']?.message);
            resetField('password-confirm');
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
                        <label htmlFor='email'>email</label>
                        <br />
                        <InputWrapper id='email' name='email' {...register('email')} />
                    </div>
                    <div>
                        <label htmlFor='nickname'>nickname</label>
                        <br />
                        <InputWrapper id='nickname' name='nickname' {...register('nickname')} />
                    </div>
                    <div>
                        <label htmlFor='password'>password</label>
                        <br />
                        <InputWrapper
                            id='password'
                            name='password'
                            type='password'
                            required
                            {...register('password')}
                        />
                    </div>
                    <div>
                        <label htmlFor='password-confirm'>password confirm</label>
                        <br />
                        <InputWrapper
                            id='password-confirm'
                            name='password-confirm'
                            type='password'
                            required
                            {...register('password-confirm', {
                                required: true,
                                validate: (value) => {
                                    if (watch('password') != value) {
                                        return 'Your password does not match';
                                    }
                                },
                            })}
                        />
                        {errors['password-confirm'] && (
                            <ErrorSpanWrapper>
                                <span>{errors['password-confirm'].message}</span>
                            </ErrorSpanWrapper>
                        )}
                    </div>
                    <div>
                        {/* <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>You agree to our Terms of Service and that you have read our Privacy Policy.</Checkbox>
                        {termError && <ErrorSpanWrapper>You must agree to our terms of service</ErrorSpanWrapper>} */}
                        <input
                            type='checkbox'
                            style={{ verticalAlign: 'middle', textAlign: 'center', width: '100%' }}
                            {...register('term', {
                                required: 'You must agree to our terms of service',
                            })}
                            className='mx-3'
                        />
                        <span style={{ display: 'table', margin: '0 auto', textAlign: 'center' }}>
                            I have read and agree to the terms of service
                        </span>
                        {errors.term && (
                            <ErrorSpanWrapper>
                                <span>{errors.term?.message}</span>
                            </ErrorSpanWrapper>
                        )}
                    </div>
                    <ButtonWrapper>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={false}
                            disabled={isSubmitting}>
                            Sign Up
                        </Button>
                        <Link href='/'>
                            <Button>Sign In</Button>
                        </Link>
                    </ButtonWrapper>
                </Form>
            </AppLayout>
        </>
    );
};

export default Signup;

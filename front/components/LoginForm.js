import { Button, Form } from 'antd';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
// {} === {} --> false
// that's why we sholudn't use <div style={{}}></div>
// it is recommended that use sytled, as shown below.
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

// TypeError: Cannot read properties of null (reading 'useMemo')
// IDK why
// const style = useMemo(() => ({
//         marginTop: 10,
//     }),
//     []
// );

const LoginForm = ({setIsLoggedIn}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ mode: 'onChange' });

    const onFormSubmit = (data) => {
        console.log(data);
        setIsLoggedIn(true);
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
        // onFinish has already applied e.preventDefault();
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
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={false} disabled={isSubmitting}>
                    Log In
                </Button>
                <Link href='/signup'>
                    <Button>회원가입</Button>
                </Link>
            </ButtonWrapper>
        </Form>
    );
};

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.node.isRequired,
};

export default LoginForm;

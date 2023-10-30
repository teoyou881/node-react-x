import { Button, Form } from "antd";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
// {} === {} --> false
// that's why we sholudn't use <div style={{}}></div>
// it is recommended that use sytled, as shown below.
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../reducers/user";

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

const LoginForm = () => {
    const { logInLoading, logInError } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError]);

    const signUp = () => {
        dispatch(userAction.signUpDoneReset());
    };

    //TODO: deals with dummy data after connecting with backend
    const onFormSubmit = (data) => {
        dispatch(userAction.loginRequest(data));
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
        <div className="formWrapper">
            <Form onFinish={handleSubmit(onFormSubmit, onErrors)}>
                <div>
                    <label htmlFor="email">email</label>
                    <br />
                    <input id="email" name="email" {...register("email")} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <br />
                    {/* do not use <Input> form antd
                    if you want to use react-form-hook
                    becasue there is no name attribute in antd Input  */}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        {...register("password")}
                    />
                </div>
                {/*{logInError && <p style={{ color: "red" }}>{logInError}</p>}*/}
                <ButtonWrapper>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={logInLoading}
                        disabled={isSubmitting}
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

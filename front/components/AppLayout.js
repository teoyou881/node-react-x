import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
    // const isLoggedIn = false;

    const menuItems = [
        {
            key: "home",
            icon: <Link href="/">X</Link>,
        },
        {
            key: "profile",
            icon: <Link href="/profile">Profile</Link>,
        },
        {
            key: "profile",
            icon: <SearchInput />,
        },
        {
            key: "signup",
            icon: <Link href="/signup">Signup</Link>,
        },
    ];
    return (
        <div>
            <Menu items={menuItems} mode="horizontal" />

            {/* <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href='/'>
                        X
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/profile'>
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href='/signup'>
                        Signup
                    </Link>
                </Menu.Item>
                {item}
            </Menu> */}

            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {/* {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>} */}
                    {/* Don't have to pass setIsLOggedIn to other component because we use redux. */}
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>

                <Col xs={24} md={12} style={{ maxWidth: "600px" }}>
                    {" "}
                    {children}{" "}
                </Col>

                <Col xs={24} md={6}>
                    <a
                        href="https://teo-you.tistory.com/"
                        target="_black"
                        // for safety, should add  rel='noreferrer noopener'
                        rel="noreferrer noopener"
                    >
                        Made by Teo
                    </a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;

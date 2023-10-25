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
    const { me } = useSelector((state) => state.user);

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
            key: "search",
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
                <Col xs={24} md={{ span: 5, offset: 3 }}>
                    {/* {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>} */}
                    {/* Don't have to pass setIsLOggedIn to another component because we use redux. */}
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>

                <Col
                    xs={24}
                    md={8}
                    // style={{ width: "600px", margin: "0 auto 10px" }}
                >
                    {" "}
                    {children}{" "}
                </Col>

                <Col xs={24} md={8}>
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

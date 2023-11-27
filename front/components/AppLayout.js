import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import UseInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const UserInfoCol = styled(Col)`
  @media (min-width: 768px) {
    min-width: 235px; /* 최소 너비 설정 */
    max-width: 25px;
    //margin-left: 100px;
    @media (max-width: 1050px) {
      left: -50px;
    }
  }
`;

const ChildrenCol = styled(Col)`
  width: 600px;
  margin-left: 20px;
  @media (max-width: 1050px) {
    width: 600px;
    margin: 0;
    left: -50px;
  }
  @media (max-width: 900px) {
    width: 480px;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    left: 0;
  }
`;

const StyledDiv = styled('div')`
  margin-left: 40px;
  height: 700px;
  background: #f8f8f8;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = UseInput('');
  const { me } = useSelector((state) => state.user);
  const router = useRouter();

  // todo: when type #, it shows 404 page. It should show hashtag page.
  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const userMenuItems = [
    {
      key: 'home',
      icon: <Link href="/">X</Link>,
    },
    {
      key: 'profile',
      icon: <Link href="/profile">Profile</Link>,
    },
    {
      key: 'search',
      icon: <SearchInput value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />,
    },
  ];
  const noUserMenuItems = [
    {
      key: 'home',
      icon: <Link href="/">X</Link>,
    },
    {
      key: 'search',
      icon: <SearchInput value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />,
    },
    {
      key: 'signup',
      icon: <Link href="/signup">Signup</Link>,
    },
  ];
  return (
    <div>
      <Menu
        items={me ? userMenuItems : noUserMenuItems}
        mode="horizontal"
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}
      />

      <Row gutter={8} style={{ marginTop: '50px' }}>
        <UserInfoCol xs={{ span: 22, offset: 1 }} md={{ span: 5, offset: 3 }}>
          {/* {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>} */}
          {/* Don't have to pass setIsLOggedIn to another component because we use redux. */}
          {me ? <UserProfile /> : <LoginForm />}
        </UserInfoCol>

        <ChildrenCol
          xs={{ span: 22, offset: 1 }}
          md={8}
          style={{
            display: 'flex',
          }}
        >
          <div style={{ width: 'inherit', margin: 'inherit' }}> {children} </div>
          <StyledDiv>
            <div style={{ width: '330px' }} />

            <a
              href="https://teo-you.tistory.com/"
              target="_black"
              rel="noreferrer noopener" // for safety
            >
              {' '}
              Made by Teo
            </a>
          </StyledDiv>
        </ChildrenCol>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

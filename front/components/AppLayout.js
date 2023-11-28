import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import UseInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const UserInfoCol = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    min-width: 500px;
  }
  @media (min-width: 769px) and (max-width: 1200px) {
    width: 735px;
    margin: 0 auto;
  }
  @media (min-width: 1201px) and (max-width: 1800px) {
    min-width: 235px;
    max-width: 250px;
    margin-left: 15%;
  }
  @media (min-width: 1801px) {
    //min-width: 235px;
    //max-width: 250px;
    margin-left: calc((100% - 1200px) / 2); /* 화면 너비에 따라 가운데 정렬 */
  }
`;

const ChildrenCol = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    min-width: 500px;
  }
  @media (min-width: 769px) and (max-width: 1200px) {
    width: 735px;
    margin: 0 auto;
    min-width: 600px;
  }
  @media (min-width: 1201px) {
    width: 600px;
    margin: 0 10px;
  }
`;

const StyledDiv = styled.div`
  height: 700px;
  background: #f8f8f8;
  margin-left: 30px;

  @media (max-width: 1450px) {
    display: none;
  }
  @media (min-width: 1801px) {
    margin-right: 50px; /* 화면 너비에 따라 가운데 정렬 */
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
        <UserInfoCol>
          {/* {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>} */}
          {/* Don't have to pass setIsLOggedIn to another component because we use redux. */}
          {me ? (
            <div>
              <UserProfile />
            </div>
          ) : (
            <div>
              <LoginForm />
            </div>
          )}
        </UserInfoCol>

        <ChildrenCol
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

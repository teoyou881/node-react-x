import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100% !important;
`;

export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height: 200%;
  background: black;
`;
export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  height: 100%;
`;

export const Global = createGlobalStyle`
.slick-slide{
	display: inline-block;
}
.slick-list{
	height: 100%;
}
.slick-prev{
    top : 10px;
    margin: 0 auto;
    position: relative;
}
.slick-next{
    top: -10px;
    margin: 0 auto;
    position: relative;
}
img{
    width: 500px;
}
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #303030;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

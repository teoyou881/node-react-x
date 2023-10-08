import PropTypes from "prop-types";
import Slick from "react-slick";
import { useState } from "react";
import {
    CloseBtn,
    Global,
    Header,
    ImageWrapper,
    Indicator,
    Overlay,
    SlickWrapper,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Global />
            <Header>
                <h1>detail image</h1>

                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        beforeChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        slideToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImageWrapper key={v.src}>
                                <img
                                    style={{ width: "1024px" }}
                                    src={v.src}
                                    alt={v.src}
                                />
                            </ImageWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1} /{images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;

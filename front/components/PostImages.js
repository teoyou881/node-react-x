import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);
    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);

    if (images.length === 1) {
        return (
            <>
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline-block" }}
                    src={images[0].src}
                    alt={images[0].src}
                    onClick={onZoom}
                />
                {showImagesZoom && (
                    <ImagesZoom images={images} onClose={onClose} />
                )}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline-block" }}
                    src={images[0].src}
                    alt={images[0].src}
                    onClick={onZoom}
                />
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline-block" }}
                    src={images[1].src}
                    alt={images[1].src}
                    onClick={onZoom}
                />
                {showImagesZoom && (
                    <ImagesZoom images={images} onClose={onClose} />
                )}
            </>
        );
    }
    return (
        <>
            <div>
                <img
                    role="presentation"
                    style={{ width: "50%", display: "inline-block" }}
                    src={images[0].src}
                    alt={images[0].src}
                />
                <div
                    role="presentation"
                    style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1}
                    more
                </div>
                {showImagesZoom && (
                    <ImagesZoom images={images} onClose={onClose} />
                )}
            </div>
        </>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={v}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
export default PostCardContent;

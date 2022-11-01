import { useState } from "react";
import PropTypes from "prop-types";
import React from 'react';
const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

const LinkNavigate = ({ page, children }) => {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

LinkNavigate.defaultProps = {
  page: "localhost:3001/managetimetable",

};

LinkNavigate.propTypes = {
  page: PropTypes.string,
};

export default LinkNavigate;



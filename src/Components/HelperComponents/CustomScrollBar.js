import React, { useState, useRef } from 'react';

const CustomScrollbar = ({ children }) => {
  const contentRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);

  const handleScroll = (event) => {
    const scrollPercent = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight);
    setThumbTop(scrollPercent * (contentRef.current.clientHeight - thumbRef.current.clientHeight));
  };

  const handleThumbDrag = (event) => {
    const newTop = event.nativeEvent.offsetY / (contentRef.current.clientHeight - thumbRef.current.clientHeight);
    contentRef.current.scrollTop = newTop * (contentRef.current.scrollHeight - contentRef.current.clientHeight);
  };

  return (
    <div className="custom-scrollbar">
      <div className="content-wrapper" ref={contentRef} onScroll={handleScroll}>
        {children}
      </div>
      <div className="thumb" ref={thumbRef} style={{ top: `${thumbTop}px` }} onMouseDown={handleThumbDrag} />
    </div>
  );
};

export default CustomScrollbar;

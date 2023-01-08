import React, { useState, useEffect } from 'react';

function WindowSize(props) {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
      // call the callback function and pass the screenHeight and screenWidth values as arguments
      props.handleWindowSize(screenHeight, screenWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    


  return (
    <div>
      [{screenHeight},{screenWidth}]
    </div>
  );
}

export default WindowSize;
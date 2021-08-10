import React from "react";
import ContentLoader from "react-content-loader";
function LoadingBlock(props) {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={500}
      viewBox="0 0 250 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="10" y="5" rx="68" ry="13" width="230" height="220" />
      <rect x="91" y="229" rx="0" ry="0" width="61" height="16" />
      <rect x="57" y="252" rx="0" ry="0" width="132" height="38" />
      <rect x="25" y="307" rx="0" ry="0" width="200" height="20" />
      <rect x="59" y="350" rx="13" ry="13" width="133" height="43" />
    </ContentLoader>
  );
}

export default LoadingBlock;

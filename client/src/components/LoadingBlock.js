import React from "react";
import ContentLoader from "react-content-loader";
function LoadingBlock(props) {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={500}
      viewBox="0 0 250 500"
      backgroundColor="#dadada"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="5" y="5" rx="68" ry="68" width="233" height="220" />
      <rect x="91" y="229" rx="0" ry="0" width="61" height="16" />
      <rect x="60" y="266" rx="0" ry="0" width="132" height="38" />
      <rect x="30" y="342" rx="0" ry="0" width="203" height="20" />
      <rect x="59" y="399" rx="13" ry="13" width="133" height="43" />
    </ContentLoader>
  );
}

export default LoadingBlock;

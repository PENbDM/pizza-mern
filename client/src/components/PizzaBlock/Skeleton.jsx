import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={464}
    viewBox="0 0 280 464"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="125" r="125" />
    <circle cx="131" cy="202" r="17" />
    <rect x="-3" y="275" rx="11" ry="11" width="280" height="23" />
    <rect x="0" y="320" rx="10" ry="10" width="281" height="71" />
    <rect x="0" y="410" rx="9" ry="9" width="94" height="30" />
    <rect x="128" y="403" rx="19" ry="19" width="152" height="43" />
  </ContentLoader>
);

export default PizzaSkeleton;

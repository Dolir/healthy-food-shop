import React from "react";
import ContentLoader from "react-content-loader";
function SingleItemLoading(props) {
  if (props.mobile !== "true") {
    return (
      <ContentLoader
        speed={2}
        width={1000}
        height={1000}
        viewBox="0 0 1000 1000"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="11" y="9" rx="7" ry="7" width="84" height="38" />
        <rect x="23" y="69" rx="9" ry="9" width="332" height="344" />
        <rect x="381" y="73" rx="11" ry="11" width="483" height="48" />
        <rect x="389" y="153" rx="0" ry="0" width="70" height="46" />
        <rect x="541" y="151" rx="6" ry="6" width="146" height="46" />
        <rect x="380" y="291" rx="0" ry="0" width="532" height="16" />
        <rect x="383" y="323" rx="0" ry="0" width="456" height="14" />
        <rect x="386" y="357" rx="0" ry="0" width="494" height="14" />
        <rect x="375" y="393" rx="0" ry="0" width="494" height="14" />
        <rect x="13" y="510" rx="11" ry="11" width="136" height="26" />
        <rect x="17" y="554" rx="0" ry="0" width="212" height="16" />
        <rect x="19" y="604" rx="0" ry="0" width="132" height="26" />
        <rect x="19" y="654" rx="12" ry="12" width="907" height="116" />
        <rect x="21" y="796" rx="4" ry="4" width="66" height="30" />
        <rect x="21" y="866" rx="0" ry="0" width="124" height="30" />
        <rect x="161" y="866" rx="0" ry="0" width="154" height="26" />
        <rect x="23" y="912" rx="11" ry="11" width="918" height="70" />
      </ContentLoader>
    );
  }

  return (
    <ContentLoader
      speed={2}
      width={1000}
      height={2000}
      viewBox="0 0 1000 2000"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="16" y="13" rx="7" ry="7" width="87" height="70" />
      <rect x="76" y="114" rx="9" ry="9" width="844" height="639" />
      <rect x="137" y="766" rx="11" ry="11" width="708" height="89" />
      <rect x="443" y="876" rx="0" ry="0" width="87" height="86" />
      <rect x="62" y="976" rx="6" ry="6" width="864" height="86" />
      <rect x="67" y="1086" rx="0" ry="0" width="861" height="27" />
      <rect x="70" y="1136" rx="0" ry="0" width="739" height="22" />
      <rect x="76" y="1190" rx="0" ry="0" width="801" height="22" />
      <rect x="60" y="1246" rx="0" ry="0" width="801" height="22" />
      <rect x="23" y="1346" rx="11" ry="11" width="143" height="49" />
      <rect x="26" y="1426" rx="0" ry="0" width="222" height="30" />
      <rect x="31" y="1520" rx="0" ry="0" width="136" height="49" />
      <rect x="31" y="1611" rx="12" ry="12" width="944" height="216" />
      <rect x="-63" y="1693" rx="4" ry="4" width="68" height="50" />
    </ContentLoader>
  );
}

export default SingleItemLoading;

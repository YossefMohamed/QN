import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop(props: any) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
  return <>{props.children}</>;
}

export default ScrollTop;

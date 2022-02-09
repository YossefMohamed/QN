import React from "react";
import styled from "styled-components";

export const Loader = () => {
  return (
    <LoaderContainer>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  width: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
`;

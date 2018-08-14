import React from 'react';
import styled from 'styled-components';

// From https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
export const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -1em 0 0 -1em;
  width: 2em;
  height: 2em;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

// import React from 'react';
// import styled, { css, } from 'styled-components';

// const Spinner = styled.div`
// width: 40px;
// height: 40px;

// position: relative;
// margin: 100px auto;
// `;

// const bounce = css

// {/* <div class="spinner">
//   <div class="double-bounce1"></div>
//   <div class="double-bounce2"></div>
// </div> */}

// .double-bounce1, .double-bounce2 {
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   background-color: #333;
//   opacity: 0.6;
//   position: absolute;
//   top: 0;
//   left: 0;

//   -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
//   animation: sk-bounce 2.0s infinite ease-in-out;
// }

// .double-bounce2 {
//   -webkit-animation-delay: -1.0s;
//   animation-delay: -1.0s;
// }

// @-webkit-keyframes sk-bounce {
//   0%, 100% { -webkit-transform: scale(0.0) }
//   50% { -webkit-transform: scale(1.0) }
// }

// @keyframes sk-bounce {
//   0%, 100% {
//     transform: scale(0.0);
//     -webkit-transform: scale(0.0);
//   } 50% {
//     transform: scale(1.0);
//     -webkit-transform: scale(1.0);
//   }
// }

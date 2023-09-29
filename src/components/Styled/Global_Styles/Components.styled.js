import styled from "styled-components";

export const StyledCard = styled.div`
  height: ${(props) => props.height};
  background: rgba( 255, 255, 255, 0.1 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

export const VideoBG = styled.video`
position: absolute;
top: 50%;
left: 50%;
min-width: 100%;
min-height: 100%;
z-index: -1;
transform: translate(-50%, -50%);
`
export const Wrapper = styled.div`
display: flex;
height: 100vh;
position: relative;
background: rgba(0, 0, 0, .35);
`
export const AppUI = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
width: 100%;
padding: 10px;
overflow: auto;
`
export const Upper = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
`
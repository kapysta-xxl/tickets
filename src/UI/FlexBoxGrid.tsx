import styled from "styled-components";

const FlexGrid = styled.div<any>`
  width: 100%;
  background: ${({ background }) => background || "#fff"};
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "stretch"};
  flex-wrap: ${({ wrap }) => wrap || "no-wrap"};
  gap: ${({ gap }) => gap || "0"};
`;

export const FlexBoxGrid = ({ className, children, ...props }: any) => {
  return <FlexGrid className={className} {...props}>{children}</FlexGrid>; 
}

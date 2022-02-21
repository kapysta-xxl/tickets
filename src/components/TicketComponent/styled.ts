import { Link } from 'react-router-dom';
import styled from "styled-components";

export const MyLink = styled(Link)<any>`
  width: 90%;
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  text-decoration: none;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  color: #000;
  margin-right: 30px;
`;

export const MyTicket = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;
  align-items: center;
  flex-direction: row;
  padding: 7px 10px;
  max-height: 80px;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  background-repeat: no-repeat;
`;

export const Span = styled.span`
  font-size: 12px;
  color: inherit;
`;

export const Priority = styled.span<any>`
  width: 70px;
  padding: 8px;
  font-size: 14px;
  color: #000;
  background: ${({ background }) => background || 'transparent' };
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

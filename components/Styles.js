import styled from "styled-components";

export const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 2px;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.2s;
  border: 2px solid black;

  &:hover {
    filter: brightness(120%);
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid black;
  padding-left: 5px;

  &:focus {
    outline: none;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  }
`;

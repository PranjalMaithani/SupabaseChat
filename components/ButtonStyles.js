import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 3px;
`;

export const ConfirmButton = styled(Button)`
  background-color: rgb(50, 168, 82);
`;

export const CancelButton = styled(Button)`
  background-color: hsl(0, 0, 55%);
`;

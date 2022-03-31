import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Como será feito uma interface que não sobrescreve nenhum dos atribbutos então pode ser feito da fora abaixo:
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
// Se precisase sobrescrever seria dessa forma
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   name: string;
// }

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;

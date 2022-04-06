import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast/index';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    keys: message => message.id,
    from: { right: '-120%', transform: 'rotateZ(0deg)' },
    enter: { right: '0%', transform: 'rotateZ(360deg)' },
    leave: { right: '-120%', transform: 'rotateZ(0deg)' },
  });

  return (
    <Container>
      {messagesWithTransitions &&
        messagesWithTransitions((style, item, t) => (
          <Toast key={t.key} style={style} message={item} />
        ))}
    </Container>
  );
};

export default ToastContainer;

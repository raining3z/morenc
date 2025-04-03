import { type ReactNode } from 'react';

type MessageProps = {
  note: 'error' | 'success';
  children: ReactNode;
};

export default function Message({ note, children }: MessageProps) {
  if (note === 'error') {
    return <div className="message message-error">{children}</div>;
  }

  return <div className="message message-success">{children}</div>;
}

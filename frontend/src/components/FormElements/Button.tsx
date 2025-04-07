import { ComponentPropsWithRef, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ComponentPropsWithRef<'button'>;

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

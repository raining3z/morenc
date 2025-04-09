import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const InputField = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

type InputProps = {
  field: string;
  label: string;
} & ComponentPropsWithRef<'input'>;

export default function Input({ field, label, ...props }: InputProps) {
  return (
    <FormGroup>
      <Label htmlFor={field}>{label}</Label>
      <InputField id={field} name={field} {...props} />
    </FormGroup>
  );
}

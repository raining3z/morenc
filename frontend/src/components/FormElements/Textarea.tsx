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

const TextareaField = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

type InputProps = {
  field: string;
  label: string;
} & ComponentPropsWithRef<'textarea'>;

export default function Textarea({ field, label, ...props }: InputProps) {
  return (
    <FormGroup>
      <Label htmlFor={field}>{label}</Label>
      <TextareaField id={field} name={field} {...props} />
    </FormGroup>
  );
}

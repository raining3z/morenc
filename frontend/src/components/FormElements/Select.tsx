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

const SelectField = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

type Options = {
  id: number;
  name: string;
  county: string;
  active?: boolean;
};

type SelectProps = {
  field: string;
  label: string;
  defaultOption: string;
  options: Options[];
} & ComponentPropsWithRef<'select'>;

export default function Input({
  field,
  label,
  options,
  defaultOption,
  ...props
}: SelectProps) {
  return (
    <FormGroup>
      <Label htmlFor={field}>{label}</Label>
      <SelectField id={field} name={field} {...props}>
        <option value="">{defaultOption}</option>
        {options.map((option: Options) => {
          if (option.active) {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          }
        })}
      </SelectField>
    </FormGroup>
  );
}

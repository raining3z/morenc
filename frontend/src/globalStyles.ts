// src/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
    background-color: #fff;
    transition: border 0.3s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #003366;
    box-shadow: 0 0 0 2px rgba(0, 51, 102, 0.2);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #333;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button.primary {
    background-color: #003366;
    color: #fff;
    border: none;
  }

  button.primary:hover {
    background-color: #002244;
  }

  button.secondary {
    background-color: #fff;
    color: #003366;
    border: 2px solid #003366;
  }

  button.secondary:hover {
    background-color: #f0f0f0;
  }

  .checkbox-group,
  .radio-group {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .checkbox-group input,
  .radio-group input {
    margin-right: 0.5rem;
    accent-color: #003366;
  }

  a {
    color: #003366;
    text-decoration: none;
    transition: color 0.2s ease, border-bottom 0.2s ease;
    font-weight: 500;
  }

  a:hover {
    color: #001f4d;
    border-bottom: 2px solid #003366;
  }

  a:active {
    color: #002244;
  }
`;

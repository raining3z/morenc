import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
`;

const Column = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

export default function Home() {
  return (
    <Container>
      <Column>
        <Header>
          <Title>Sign Up</Title>
        </Header>
      </Column>

      <Column>
        <Header>
          <Title>Login</Title>
        </Header>
      </Column>
    </Container>
  );
}

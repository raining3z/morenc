import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import CompletedProjects from './pages/CompletedProjects';
import Header from './components/Header';

import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 50px;
`;

const Body = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.widths.maxWidth};
  margin: 0 auto;
  min-height: 100vh;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function App() {
  return (
    <Router>
      <MainContainer>
        <Header />
        <Body>
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:_id" element={<ProjectDetails />} />
            <Route path="/completed" element={<CompletedProjects />} />
          </Routes>
        </Body>
      </MainContainer>
    </Router>
  );
}

// https://leetcode.com/problems/adding-spaces-to-a-string/

// var addSpaces = function(s, spaces) {
//     const numberOfLetters = s.length;
//     for (let index = 0; index < spaces.length; index++) {
//         const firstWord = s.substring(0, spaces[index]);
//         const secondWord = s.substring(spaces[0], spaces[1]);
//     }

//     const thirdWord = s.substring(spaces[1], spaces[2]);
//     const lastWord = s.substring(spaces[2], s.length)

//     console.log(numberOfLetters, firstWord, secondWord, thirdWord, lastWord)
// };

// addSpaces('LeetcodeHelpsMeLearn', [8, 13, 15])

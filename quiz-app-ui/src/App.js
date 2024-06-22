import './App.css';
import QuizList from './components/quiz/QuizList';
import QuizPage from './components/quiz/QuizPage'
import Dashboard from './components/dashboard/Dashboard'
import {Route,Routes} from 'react-router-dom'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard  />} />
      <Route path="/add-quiz" element={<Dashboard  />} />
      <Route path="/quiz" element={<QuizList  />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
     
    </Routes>
  );
}

export default App;

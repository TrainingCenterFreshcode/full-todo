import { useState, useEffect } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import TodoPage from './pages/TodoPage';
import history from './BrowserHistory';
import { authUser } from './api/userApi';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // if (!user) {
    //   authUser()
    //     .then((userData) => {
    //       setUser(userData.data);
    //     })
    //     .catch((error) => {
    //       // перенаправляємось на аутенфікацію
    //       return history.push('/');
    //     });
    // }
  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<TodoPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

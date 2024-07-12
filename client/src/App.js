import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import TodoPage from './pages/TodoPage';
import history from './BrowserHistory';
import { connect } from 'react-redux';
import { authUserRequest } from './actions/actionCreator';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthByQRCode from './pages/AuthByQRCode/AuthByQRCode';

function App(props) {
  useEffect(() => {
    if (!props.user) {
      props.authUserRequest();
    }
  }, []);

  useEffect(() => {
    if(props.notification) {
      toast(props.notification);
    }
  }, [props.notification]);

  return (
    <HistoryRouter history={history}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/" element={<TodoPage />} />
        <Route path='/authByQR/' element={<AuthByQRCode />} />
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = ({ user, notification }) => ({ user, notification });

const mapDispatchToProps = {
  authUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// http://localhost:3000/authByQR/?refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZiMWVmMzA3ZmEyMjY2M2M0MDIwYWUiLCJlbWFpbCI6ImphbmUuZG9lQGdtYWlsLmNvbSIsImlhdCI6MTcyMDgwNDkwMSwiZXhwIjoxNzIwODA4NTAxfQ.2JWh8Xx4yYQcxETCFS0N_uQb1N3SWl-KcZDTGCYxrXw

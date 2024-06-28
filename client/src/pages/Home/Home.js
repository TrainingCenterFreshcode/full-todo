import React, { useState, useEffect } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
  const [state, setState] = useState(false); // true -> SignUp ; false -> SignIn

  const buttonHandler = () => {
    setState(state => !state);
  }

  return (
    <div className={styles.container}>
      <header>
        <button onClick={buttonHandler}>{state ? "SignIn" : "SignUp" }</button>
      </header>

      <main className={styles['form-wrapper']}>
        {state ? <SignUp /> : <SignIn /> }
        {props.error && <div className={styles['error-container']}>{props.error.message}</div>}
      </main>
    </div>
  );
}

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps)(Home);

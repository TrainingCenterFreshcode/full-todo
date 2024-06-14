import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = (props) => {
  const { item: { body, deadline, status } } = props;

  return (
    <li>
      <div className={styles['flex-container']}>
        <span>{body}</span>
        <span>{new Date(deadline).toISOString()}</span>
        <span>{status}</span>
      </div>
    </li>
  );
}

export default TodoItem;

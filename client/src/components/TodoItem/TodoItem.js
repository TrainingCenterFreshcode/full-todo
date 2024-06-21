import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = (props) => {
  const { item: { _id, body, deadline, status } } = props;

  return (
    <li>
      <div className={styles['flex-container']}>
        <span>{body}</span>
        <span>{new Date(deadline).toISOString()}</span>
        <span>{status}</span>
        <button onClick={() => props.delCallback(_id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;

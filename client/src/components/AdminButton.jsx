import React from 'react';
import { Link } from 'react-router-dom';

const AdminButton = () => {
  return (
    <div>
      <Link to="/seller-DashBoard">
        <input
          type="button"
          value="ADD"
          style={{
            height: '40px',
            width: '210px',
            backgroundColor: '#DFA8E4',
            cursor: 'pointer',
            margin: '10px',
            border: 'none',
            borderRadius: '5px',
          }}
        />
      </Link>
      <Link to="/bookrooms">
        <input
          type="button"
          value="SHOW"
          style={{
            height: '40px',
            width: '210px',
            backgroundColor: '#DFA8E4',
            cursor: 'pointer',
            margin: '10px',
            border: 'none',
            borderRadius: '5px',
          }}
        />
      </Link>
    </div>
  );
};

export default AdminButton;

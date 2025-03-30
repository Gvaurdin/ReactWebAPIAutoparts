import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Autoparts Shop</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  },
};

export default Header;

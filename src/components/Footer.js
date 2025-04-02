import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; Магазин автозапчастей Autoparts. Все права защищены </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#222',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Footer;

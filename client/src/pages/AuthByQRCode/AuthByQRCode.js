import React from 'react';

const AuthByQRCode = () => {
  const refresh = new URLSearchParams(window.location.search).get('refresh');
  return (
    <div>
      {refresh}
    </div>
  );
}

export default AuthByQRCode;

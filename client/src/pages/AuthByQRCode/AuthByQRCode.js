import React from 'react';
import { authByQRCodeRequest, emptyUserObjectRequest } from '../../actions/actionCreator';
import { connect } from 'react-redux';

const AuthByQRCode = (props) => {
  props.emptyUserObjectRequest();

  const refresh = new URLSearchParams(window.location.search).get('refresh');

  props.authByQRCodeRequest(refresh);
  return (
    <div>
      {refresh}
    </div>
  );
}

const mapDispatchToProps = {
  authByQRCodeRequest,
  emptyUserObjectRequest
}

export default connect(null, mapDispatchToProps)(AuthByQRCode);

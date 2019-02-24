import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import queryString from 'query-string';

import * as SessionOperations from '../state/ducks/session/operations'

const mapStateToProps = state => {
  return {
    uuid: state.session.uuid,
    token: state.session.token
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setToken: SessionOperations.setToken,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Welcome extends React.Component {
  componentWillMount() {
    if(this.props.location.hash) {
      let spotifyPayload = queryString.parse(this.props.location.hash);
      if(spotifyPayload.state === this.props.uuid) {
        this.props.setToken(spotifyPayload.access_token);
      }
    }
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

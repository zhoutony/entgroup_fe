import _ from 'lodash';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from './styles.less';

// 头部标签
const Header = () => (
  <Helmet
    defaultTitle="XX应用"
    meta={[
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge,chrome=1' },
      {
        name: 'viewport',
        content: 'user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0',
      },
    ]}
  />
);

// 应用的主体结构
const App = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return _.pick(state, ['errorMessage']);
}

export default connect(mapStateToProps, {
})(App);

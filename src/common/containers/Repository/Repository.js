import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { fetchRepository } from '../../actions';

const hooks = {
  fetch: ({ dispatch, params: { owner, repo } }) => dispatch(fetchRepository(owner, repo)),
};

const Repository = ({ repository }) => (
  <ul>
    {_.map(repository, (value, key) => (
      <li key={key}>{key}: {JSON.stringify(value)}</li>
    ))}
  </ul>
);

// 属性校验设置
Repository.propTypes = {
  repository: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => _.pick(state, 'repository');

export default connect(mapStateToProps)(provideHooks(hooks)(Repository));

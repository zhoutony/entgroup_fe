import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { provideHooks } from 'redial';

import { fetchRepositories } from '../../actions';

import styles from './styles.less';

const hooks = {
  fetch: ({ dispatch }) => dispatch(fetchRepositories()),
};

const Repositories = ({ repositories }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Facebook的开源仓库列表</h1>
    <ul className={styles.list}>
      {repositories.map(({ id, owner, name, description }) => (
        <li className={styles.item} key={id}>
          <Link to={`/repositories/${owner.login}/${name}`}>
            {name} - {description}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Repositories.propTypes = {
  repositories: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => _.pick(state, 'repositories');

export default connect(mapStateToProps)(provideHooks(hooks)(Repositories));

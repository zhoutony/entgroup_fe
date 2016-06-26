import { CALL_API } from 'redux-api-middleware';
import urlencode from 'urlencode';

const API_PREFIX = 'https://api.github.com';

// 获取仓库列表
export const FETCH_REPOSITORIES_REQUEST = 'FETCH_REPOSITORIES_REQUEST';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const fetchRepositories = () => {
  return {
    [CALL_API]: {
      endpoint: `${API_PREFIX}/users/facebook/repos`,
      method: 'GET',
      types: [
        FETCH_REPOSITORIES_REQUEST,
        FETCH_REPOSITORIES_SUCCESS,
        FETCH_REPOSITORIES_FAILURE,
      ],
    },
  };
};

// 获取仓库信息
export const FETCH_REPOSITORY_REQUEST = 'FETCH_REPOSITORY_REQUEST';
export const FETCH_REPOSITORY_SUCCESS = 'FETCH_REPOSITORY_SUCCESS';
export const FETCH_REPOSITORY_FAILURE = 'FETCH_REPOSITORY_FAILURE';
export const fetchRepository = (owner, repo) => {
  return {
    [CALL_API]: {
      endpoint: `${API_PREFIX}/repos/${owner}/${repo}`,
      method: 'GET',
      types: [
        FETCH_REPOSITORY_REQUEST,
        FETCH_REPOSITORY_SUCCESS,
        FETCH_REPOSITORY_FAILURE,
      ],
    },
  };
};

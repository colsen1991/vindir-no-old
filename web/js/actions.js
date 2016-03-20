import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';

export const AJAX = 'AJAX';

export const FETCH_EXCERPTS_START = 'FETCH_EXCERPTS_START';
export const FETCH_EXCERPTS_SUCCESSFUL = 'FETCH_EXCERPTS_SUCCESSFUL';
export const FETCH_EXCERPTS_ERROR = 'FETCH_EXCERPTS_ERROR';

export const FETCH_BLOG_START = 'FETCH_BLOG_START';
export const FETCH_BLOG_SUCCESSFUL = 'FETCH_BLOG_SUCCESSFUL';
export const FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR';
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

export const FETCH_ALL_BLOGS_START = 'FETCH_ALL_BLOGS_START';
export const FETCH_ALL_BLOGS_SUCCESSFUL = 'FETCH_ALL_BLOGS_SUCCESSFUL';
export const FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR';

export const FETCH_BLOG_FOR_EDITING_START = 'FETCH_BLOG_FOR_EDITING_START';
export const FETCH_BLOG_FOR_EDITING_SUCCESSFUL = 'FETCH_BLOG_FOR_EDITING_SUCCESSFUL';
export const FETCH_BLOG_FOR_EDITING_ERROR = 'FETCH_BLOG_FOR_EDITING_ERROR';
export const TITLE_CHANGED = 'TITLE_CHANGED';
export const HEADER_IMAGE_LINK_CHANGED = 'HEADER_IMAGE_LINK_CHANGED';
export const EXCERPT_CHANGED = 'EXCERPT_CHANGED';
export const TEXT_CHANGED = 'TEXT_CHANGED';
export const PUBLISHED_CHANGED = 'PUBLISHED_CHANGED';

export const fetchExcerptsStart = createAction(FETCH_EXCERPTS_START);
export const fetchExcerptsSuccess = createAction(FETCH_EXCERPTS_SUCCESSFUL);
export const fetchExcerptsError = createAction(FETCH_EXCERPTS_ERROR);
export const fetchExcerpts = () => {
  return {
    type: AJAX,
    payload: {
      url: '/api/blog/excerpts',
      defaultIfNoData: [],
      actions: {
        start: fetchExcerptsStart,
        success: fetchExcerptsSuccess,
        error: fetchExcerptsError
      }
    }
  };
};

export const fetchBlogStart = createAction(FETCH_BLOG_START);
export const fetchBlogSuccess = createAction(FETCH_BLOG_SUCCESSFUL);
export const fetchBlogError = createAction(FETCH_BLOG_ERROR);
export const showComments = createAction(SHOW_COMMENTS);
export const fetchBlog = (id) => {
  return {
    type: AJAX,
    payload: {
      url: `/api/blog/${id}`,
      actions: {
        start: fetchBlogStart,
        success: fetchBlogSuccess,
        error: fetchBlogError
      }
    }
  };
};

export const loginStart = createAction(LOGIN_START);
export const loginSuccess = (payload) => {
  return dispatch => {
    dispatch(loginActualSuccess(payload));

    browserHistory.push('/admin');
  }
};
export const loginActualSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);
export const usernameChanged = createAction(USERNAME_CHANGED);
export const passwordChanged = createAction(PASSWORD_CHANGED);
export const login = (username, password) => {
  return {
    type: AJAX,
    payload: {
      url: '/api/login',
      options: {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json' }
      },
      actions: {
        start: loginStart,
        success: loginSuccess,
        error: loginError
      }
    }
  };
};

export const fetchAllBlogsStart = createAction(FETCH_ALL_BLOGS_START);
export const fetchAllBlogsSuccess = createAction(FETCH_ALL_BLOGS_SUCCESSFUL);
export const fetchAllBlogsError = createAction(FETCH_ALL_BLOGS_ERROR);
export const fetchAllBlogs = () => {
  return {
    type: AJAX,
    payload: {
      url: '/api/secure/allBlogs',
      auth: true,
      defaultIfNoData: [],
      actions: {
        start: fetchAllBlogsStart,
        success: fetchAllBlogsSuccess,
        error: fetchAllBlogsError
      }
    }
  };
};

export const fetchBlogForEditingStart = createAction(FETCH_BLOG_FOR_EDITING_START);
export const fetchBlogForEditingSuccess = createAction(FETCH_BLOG_FOR_EDITING_SUCCESSFUL);
export const fetchBlogForEditingError = createAction(FETCH_BLOG_FOR_EDITING_ERROR);
export const fetchBlogForEditing = (id) => {
  return {
    type: AJAX,
    payload: {
      url: `/api/secure/blog/${id}`,
      auth: true,
      actions: {
        start: fetchBlogForEditingStart,
        success: fetchBlogForEditingSuccess,
        error: fetchBlogForEditingError
      }
    }
  };
};
export const titleChanged = createAction(TITLE_CHANGED);
export const headerImageLinkChanged = createAction(HEADER_IMAGE_LINK_CHANGED);
export const excerptChanged = createAction(EXCERPT_CHANGED);
export const textChanged = createAction(TEXT_CHANGED);
export const publishedChanged = createAction(PUBLISHED_CHANGED);

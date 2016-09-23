/* eslint-env browser */

import { combineReducers } from 'redux';
import createStore from 'phenomic/lib/redux/createStore';
import * as phenomicReducers from 'phenomic/lib/redux/modules';
import * as reducers from 'app/reducers';

import isBrowser from 'app/isBrowser';

const devTools = (isBrowser && window.devToolsExtension) && window.devToolsExtension();

console.log('tools', devTools);

const storeCreator = devTools ? devTools(createStore) : createStore;

const store = storeCreator(
  // here we combine phenomic required reducers and your custom ones
  combineReducers({
    ...phenomicReducers,
    ...reducers,
  }),
  { ...(typeof window !== 'undefined') && window.__INITIAL_STATE__ }
);

// webpack hot loading
if (module.hot) {
  // enable hot module replacement for reducers
  module.hot.accept([
    // "phenomic/lib/redux/modules",
    // will not be updated since it's a lib :)
    // but will still needs to be required

    // hot load your reducers
    'app/reducers',
  ], () => {
    const updatedReducer = combineReducers({
      /* eslint import/newline-after-import: 0 */
      // we still need to combine all reducers
      ...require('phenomic/lib/redux/modules'),
      ...require('app/reducers'),
    });
    store.replaceReducer(updatedReducer);
  });
}

export default store;

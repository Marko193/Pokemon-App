import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function configureStore(initialState = {}) {
    const composeEnhancers = composeWithDevTools({ shouldHotReload: false });
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(...middlewares)
    );

    sagaMiddleware.run(sagas);

    return store;
}

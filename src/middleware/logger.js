export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('SF * type: ', action.type);
    console.log('SF * payload: ', action.payload);
    console.log('SF * currentState: ', store.getState());

    next(action);

    console.log('SF * next state: ', store.getState());
};

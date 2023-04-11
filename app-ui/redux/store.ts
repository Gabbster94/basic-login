import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "../reducers/userSlice";
import authReducer from "../reducers/authSlice";

const persistConfig = {
  key: 'root',
  storage
};

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logoutAction')
    state = undefined;

  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NEXT_NODE_ENV !== "production",
  middleware: [thunk]
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

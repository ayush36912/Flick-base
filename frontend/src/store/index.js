import { configureStore } from '@reduxjs/toolkit';

import UsersReducer from './reducers/users';
import SiteReducer from './reducers/site';
import NotificationsReducer from './reducers/notifications';
import ArticlesReducer from './reducers/articles';

export const store = configureStore({
    reducer:{
        users: UsersReducer,
        articles: ArticlesReducer,
        site: SiteReducer,
        notifications: NotificationsReducer
    }
});
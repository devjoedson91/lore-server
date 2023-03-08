import { Router } from 'express';

import { CreateArticleController } from './controllers/article/CreateArticleController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesWithPathController } from './controllers/category/ListCategoriesWithPathController';
import { ListTreeCategoriesController } from './controllers/category/ListTreeCategoriesController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

export const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category/path', isAuthenticated, new ListCategoriesWithPathController().handle);
router.get('/category/tree', isAuthenticated, new ListTreeCategoriesController().handle);

router.post('/article', isAuthenticated, new CreateArticleController().handle);
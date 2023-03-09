import { Router } from 'express';

import { CreateArticleController } from './controllers/article/CreateArticleController';
import { ListArticlesByCategoryController } from './controllers/article/ListArticlesByCategoryController';
import { listArticlesController } from './controllers/article/ListArticlesController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesWithPathController } from './controllers/category/ListCategoriesWithPathController';
import { ListTreeCategoriesController } from './controllers/category/ListTreeCategoriesController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAdmin } from './middlewares/isAdmin';

import { isAuthenticated } from './middlewares/isAuthenticated';

export const router = Router();

router.post('/signup', new CreateUserController().handle);
router.post('/users', isAuthenticated, isAdmin, new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category/path', isAuthenticated, new ListCategoriesWithPathController().handle);
router.get('/category/tree', isAuthenticated, new ListTreeCategoriesController().handle);

router.post('/article', isAuthenticated, new CreateArticleController().handle);
router.get('/articles', isAuthenticated, new listArticlesController().handle);
router.get('/articles/category/:category_id', isAuthenticated, new ListArticlesByCategoryController().handle);
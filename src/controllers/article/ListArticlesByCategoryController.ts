import { Request, Response } from "express";
import { ListArticlesByCategoryService } from "../../services/article/listArticlesByCategoryService";

export class ListArticlesByCategoryController {
    async handle(req: Request, res: Response) {

        const category_id = req.params.category_id;

        const listArticlesByCategoryService = new ListArticlesByCategoryService();

        const articles = await listArticlesByCategoryService.execute(category_id);

        return res.json(articles);

    }
}
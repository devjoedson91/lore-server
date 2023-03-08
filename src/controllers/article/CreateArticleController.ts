import { Request, Response } from "express";
import { CreateArticleService } from "../../services/article/CreateArticleService";

export class CreateArticleController {
    async handle(req: Request, res: Response) {

        const {name, description, imageurl, content, user_id, category_id} = req.body;

        if (name === '') throw new Error('Name invalid');

        const createArticleService = new CreateArticleService();

        const article = await createArticleService.execute({name, description, imageurl, content, user_id, category_id});

        return res.json(article);

    }
}
import { Request, Response } from "express";
import { ListCategoriesWithPathService } from "../../services/category/ListCategoriesWithPathService";

export class ListCategoriesWithPathController {

    async handle(req: Request, res: Response) {

        const listCategoriesWithPathService = new ListCategoriesWithPathService();

        const categories = await listCategoriesWithPathService.execute();

        return res.json(categories);

    }

}
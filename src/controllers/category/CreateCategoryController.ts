import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const {name, parent_id} = req.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({name, parent_id});

        return res.json(category);

    }
}
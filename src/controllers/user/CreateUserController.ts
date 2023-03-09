import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {

    async handle(req: Request, res: Response) {

        const {name, email, password, admin} = req.body;

        if (!req.originalUrl.startsWith('/users')) req.body.admin = false;        

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password, admin});

        return res.json(user);

    }
}
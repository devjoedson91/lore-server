import { Request, Response, NextFunction } from "express";
import { AuthUserService } from "../services/user/AuthUserService";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    const authUserService = new AuthUserService();

    const user = await authUserService.execute(req.body);

    if (user.admin) { 
        
        return next();
    } else {

        return res.status(401).send('Usuário não é administrador');

    }

}
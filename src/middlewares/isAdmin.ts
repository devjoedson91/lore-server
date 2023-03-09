import { Request, Response, NextFunction } from "express";
import { DetailUserService } from "../services/user/DetailUserService";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    const authUserService = new DetailUserService();

    const user = await authUserService.execute(req.user_id);

    if (user.admin) { 
        
        return next();
    } else {

        return res.status(401).send('Usuário não é administrador');

    }

}
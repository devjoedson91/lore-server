import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class listArticlesController {

    async handle(req: Request, res: Response) {

        const limit = 10;

        const result = await prisma.$transaction([
            prisma.article.count(),
            prisma.article.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    category_id: true
                }
            })
        ]);

        const articles = result[1];
        const count = result[0];

        return res.json({articles, limit, count});

    }

}
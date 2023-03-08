import { prisma } from "../../lib/prisma";

export class ListArticlesByCategoryService {

    async execute(category_id: string) {

        const articles = await prisma.$queryRaw`
            SELECT
                a.id,
                a.name,
                a.description,
                a.imageurl, 
                u.name AS author
            FROM articles a JOIN users u ON a.user_id = u.id 
                    WHERE a.category_id IN (
                    WITH RECURSIVE subcategories (id) AS (
                    SELECT id FROM categories WHERE id = ${category_id}
                    UNION ALL 
                    SELECT c.id FROM subcategories, categories c 
                    WHERE parent_id = subcategories.id
                )
            SELECT id FROM subcategories
            ) 
            ORDER BY a.category_id DESC
        `;

        return articles;

    }

}
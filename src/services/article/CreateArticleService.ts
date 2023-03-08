import { prisma } from "../../lib/prisma";

interface ArticleProps {
    name: string;
    description: string;
    imageurl: string | null;
    content: string;
    user_id: string;
    category_id: string;
}

export class CreateArticleService {

    async execute({name, description, imageurl, content, user_id, category_id}: ArticleProps) {

        const article = await prisma.article.create({
            data: {
                name: name,
                description: description,
                imageurl: imageurl,
                content: content,
                user_id: user_id,
                category_id: category_id
            },
            select: {
                name: true,
                description: true,
                user_id: true,
                category_id: true
            }
        });

        return article;

    }

}
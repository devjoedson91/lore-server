import { prisma } from "../../lib/prisma";

interface CategoryRequest {
    name: string;
    parent_id?: string | null;
}

export class CreateCategoryService {

    async execute({name, parent_id}: CategoryRequest) {

        if (name === '') throw new Error('Name invalid');

        const category = await prisma.category.create({
            data: {
                name: name,
                parent_id: parent_id
            },
            select: {
                id: true,
                name: true,
                parent_id: true
            }
        });

        return category;

    }

}
import { prisma } from "../../lib/prisma";

export class ListCategoriesWithPathService {

    async execute() {

        const categories = await prisma.category.findMany();

        const getParent = (parentId: string | null) => {

            const parent = categories.filter(parent => parent.id === parentId);

            return parent.length ? parent[0] : null;

        }

        const categoriesWithParents = categories.map(category => {

            let path = category.name;
            let parent = getParent(category.parent_id);

            while(parent) {
                path = `${parent.name} > ${path}`;
                parent = getParent(parent.parent_id);
            }

            return {...category, path};

        });

        categoriesWithParents.sort((a, b) => {
            if (a.path < b.path) return -1;
            if (a.path > b.path) return 1;
            return 0;
        });

        return categoriesWithParents;

    }

}
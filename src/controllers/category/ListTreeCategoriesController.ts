import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

interface CategoryProps {
    id: string;
    name: string;
    parent_id?: string | null;
}

interface ChildrenProps {
    id: string;
    name: string;
    parent_id: string | null;
    children: ChildrenProps[];
}

export class ListTreeCategoriesController {
    async handle(req: Request, res: Response) {

        const toTree = (categories: CategoryProps[], tree: any) => {

            if (!tree) tree = categories.filter(c => !c.parent_id);

            tree = tree.map((parentNode: ChildrenProps) => {

                const isChild = (node: CategoryProps) => node.parent_id === parentNode.id;
                parentNode.children = toTree(categories, categories.filter(isChild));

                return parentNode;

            });

            return tree;
        }

        const categories = await prisma.category.findMany();

        return res.json(toTree(categories, undefined));

    }
}
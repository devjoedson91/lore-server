import { prisma } from "../../lib/prisma";

export class DetailUserService {

    async execute(user_id: string) {

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;

    }

}


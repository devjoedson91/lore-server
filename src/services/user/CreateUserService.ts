import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

interface UserRequest { 

    name: string;
    email: string;
    password: string;
    admin?: boolean;

}

export class CreateUserService {

    async execute({name, email, password, admin}: UserRequest) {

        function validateEmail() {

            const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    
            return regex.test(email) ;

        }

        if (!email || !validateEmail()) throw new Error('Email incorrect');

        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) throw new Error('User already exists');

        const passwordHash = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                admin: admin
            },
            select: {
                id: true,
                name: true,
                email: true,
                admin: true
            }
        });

        return user;

    }

}
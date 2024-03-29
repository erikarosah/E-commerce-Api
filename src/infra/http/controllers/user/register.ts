import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUserUseCase } from '@/infra/factories/user/make-register-user-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.string(),
    })

    const { name, email, password, role } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUserUseCase()

        const result = await registerUseCase.execute({
            name,
            email,
            password,
            role
        })

        if (result.isLeft()) {
            return result.value
        }

        return reply.status(201).send()

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }
}
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchProductsByCategoryUseCase } from '@/infra/factories/products/make-fetch-products-by-category'

export async function fetchProductsByCategory(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        category: z.string()
    })

    const {
        category
    } = registerBodySchema.parse(request.params)

    try {
        const fetchProductsByCategory = makeFetchProductsByCategoryUseCase()

        const result = await fetchProductsByCategory.execute({
            category
        })

        if (result.isLeft()) {
            return result.value.message
        }

        return reply.status(200).send([
            result.value.products
        ])

    } catch (error) {
        return reply.status(500).send({
            error
        })
    }

}
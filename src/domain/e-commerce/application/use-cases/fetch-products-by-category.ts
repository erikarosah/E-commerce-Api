import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchProductsByCategoryUseCaseRequest {
    category: string,
}

type FetchProductsByCategoryUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsByCategoryUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        category
    }: FetchProductsByCategoryUseCaseRequest): Promise<FetchProductsByCategoryUseCaseResponse> {
        const products = await this.productRepository.fetchManyByCategory(category)

        if (!products || products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}
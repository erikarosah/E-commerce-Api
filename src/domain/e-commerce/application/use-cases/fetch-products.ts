import { Either, left, right } from '@/core/either'
import { ProductRepository, product } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type FetchProductsUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        products: product[]
    }
>

export class FetchProductsUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<FetchProductsUseCaseResponse> {
        const products = await this.productRepository.fetchProducts()

        if (products.length === 0) {
            return left(new ResourceNotFoundError())
        }

        return right({
            products
        })
    }
}
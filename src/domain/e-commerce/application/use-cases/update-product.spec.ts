import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { UpdateProductUseCase } from './update-product'
import { Product } from '../../entities/product'
import { UniqueID } from '@/core/entities/unique-id'

let inMemoryProductRepositoty: InMemoryProductRepository
let sut: UpdateProductUseCase

describe('Update Product Use Case', () => {
    beforeEach(() => {
        inMemoryProductRepositoty = new InMemoryProductRepository
        sut = new UpdateProductUseCase(inMemoryProductRepositoty)
    })

    it('should be able to update product', async () => {
        const product = Product.create({
            name: 'some product',
            available: true,
            category: 'some category',
            image: 'url',
            new_price: 50,
            old_price: 40
        },
            new UniqueID('1')
        )

        inMemoryProductRepositoty.create(product)

        await sut.execute({
            id: product.id.toString(),
            name: 'new name product',
            available: false,
            category: 'some category',
            image: 'url',
            new_price: 50,
            old_price: 40
        })

        expect(inMemoryProductRepositoty.items[0]).toMatchObject({
            name: 'new name product',
            available: false,
            old_price: 40
        })
    })

    it('should not be able to update product if not exists', async () => {
        expect(() =>
            sut.execute({
                id: '1',
                name: 'new name product',
                available: false,
                category: 'some category',
                image: 'url',
                new_price: 50,
                old_price: 40
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
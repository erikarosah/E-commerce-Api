import { UserRepository } from '@/domain/e-commerce/application/repositories/user-repository'
import { User } from '@/domain/e-commerce/entities/user'

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []

    async create(newUser: User) {
        this.items.push(newUser)

        const user = this.items[0]

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        if (user) {
            return user
        }

        return null
    }

    async findById(id: string) {
        const user = this.items.find((item) => item.id.toString() === id)

        if (user) {
            return user
        }

        return null
    }
}
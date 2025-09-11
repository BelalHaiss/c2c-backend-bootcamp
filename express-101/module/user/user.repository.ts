import { usersData } from './user.data';
import { User } from './user.entity';

export class UserRepository {
  private users: User[] = [];

  constructor(users: User[] = usersData) {
    this.users = users;
  }
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  create(name: string, email: string, password: string, avatar?: string): User {
    const user: User = {
      id: this.idCounter.toString(),
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      password
    };

    if (avatar) {
      user.avatar = avatar;
    }

    this.idCounter++;
    this.users.push(user);
    return user;
  }

  update(
    id: string,
    name?: string,
    email?: string,
    avatar?: string
  ): User | null {
    const user = this.findById(id);
    if (!user) return null;

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    user.updatedAt = new Date();

    return user;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

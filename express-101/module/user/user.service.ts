import { User } from './user.entity';
import { UserRepositoryI } from './interfaces/user-repo-interface';
import { userMongoRepository } from './user-mongo-repository';

class UserService {
  constructor(private userRepo: UserRepositoryI = userMongoRepository) {}
  getUsers(page = 1, limit = 10) {
    return this.userRepo.findAll(page, limit);
  }

  getUser(id: string) {
    return this.userRepo.findById(id);
  }

  public findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  public createUser(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ) {
    return this.userRepo.create(name, email, password, avatar);
  }

  updateUser(id: string, name?: string, email?: string, avatar?: string) {
    return this.userRepo.update(id, name, email, avatar);
  }

  deleteUser(id: string) {
    return this.userRepo.delete(id);
  }

  isUserIdExist(id: string): boolean {
    return !!this.userRepo.findById(id);
  }
}

export const userService = new UserService();

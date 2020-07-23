import { Repository, EntityRepository } from 'typeorm';
import { SignUpDTO } from './dto';
import { Tasks } from '../tasks/tasks.entity';
import { genSalt, hash } from 'bcryptjs';
import { User } from '../user/user.entity';
import { status } from 'src/shared/entity-status.enum';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signUpDTO: SignUpDTO) {
    const { name, email, password } = signUpDTO;
    const user = new User();
    user.name = name;
    user.email = email;

    const tasks: Tasks[] = new Array<Tasks>();
    user.tasks = tasks;

    user.status = status.ACTIVE;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}

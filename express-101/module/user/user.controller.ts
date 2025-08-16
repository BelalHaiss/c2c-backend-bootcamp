import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private service = new UserService();

  getUsers = (
    req: Request<{}, {}, {}, { page: string; limit: string }>,
    res: Response
  ) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const users = this.service.getUsers(page, limit);
    res.json(users);
  };

  getUser = (req: Request<{ uid: string }>, res: Response) => {
    const id = req.params.uid;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const user = this.service.getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  };

  createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;
    console.log(req.file);
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = this.service.createUser(name, email, avatar);
    res.status(201).json(user);
  };

  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const { name, email } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = this.service.updateUser(id, name, email, avatar);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  };

  deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const deleted = this.service.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  };
}

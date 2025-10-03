import { Request, Response } from 'express';
import { userService } from './user.service';

export class UserController {
  private service = userService;

  getUsers = async (
    req: Request<{}, {}, {}, { page?: string; limit?: string }>,
    res: Response
  ) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { users, totalRecords } = await this.service.getUsers(page, limit);
    res.paginationResponse(users, { page, limit, totalRecords });
  };

  getUser = async (req: Request<{ uid: string }>, res: Response) => {
    const id = req.params.uid;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const user = await this.service.getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.ok(user);
  };

  createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    console.log(req.file);
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await this.service.createUser(name, email, password, avatar);
    res.create(user);
  };

  updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const { name, email } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await this.service.updateUser(id, name, email, avatar);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.create(user);
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });

    const deleted = await this.service.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.ok({});
  };
}

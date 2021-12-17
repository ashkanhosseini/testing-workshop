import { rest } from 'msw';
import { setupServer } from 'msw/node';
import setToDone, { BASE_URL } from './set-todo-to-done';

describe('setToDone', () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/todo/34`, (req, res, ctx) => {
      return res(
        ctx.json({ title: 'some item', id: 34, status: 'in progress' })
      );
    }),
    rest.get(`${BASE_URL}/todo/33`, (req, res, ctx) => {
      return res(ctx.json(null));
    }),
    rest.post(`${BASE_URL}/done`, (req, res, ctx) => {
      if (req.body.id == 34) {
        ctx.status(200);
        return res(ctx.json({ success: true }));
      }
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should throw when todo item does not exist', async () => {
    await expect(setToDone(33)).rejects.toMatchInlineSnapshot(
      `[Error: item with id 33 does not exist]`
    );
  });

  it('should set todo as done ', async () => {
    const id = 34;

    const result = await setToDone(id);
    expect(result).toEqual({ success: true });
  });

  // TODO: Track
  // it('should set todo as done and track user activity', async () => {
  //   const id = 34;
  //   server.use(
  //     rest.post(
  //       `https://www.miro.com/track/user_set_to_do`,
  //       (req, res, ctx) => {
  //         if (req.body.todoId == 34) {
  //           ctx.status(200);
  //           return res(ctx.json({ success: true }));
  //         }
  //       }
  //     )
  //   );

  //   const result = await setToDone(id);
  //   expect(result).toEqual({ success: true });
  // });

  //TODO: Todo Owner
  // it('should set todo as done ', async () => {
  //   const id = 34;
  //   server.use(
  //     rest.get(`https://www.miro.com/who_am_i`, (req, res, ctx) => {
  //       return res(ctx.json({ id: 1, name: 'user #1' }));
  //     })
  //   );

  //   const result = await setToDone(id);
  //   expect(result).toEqual({ success: true });
  // });

  //TODO: Todo Owner id doesn't match
  // fit('should set todo as done ', async () => {
  //   const todoId = 45;
  //   server.use(
  //     rest.get(`${BASE_URL}/todo/${todoId}`, (req, res, ctx) => {
  //       return res(
  //         ctx.json({
  //           title: 'some item',
  //           id: todoId,
  //           status: 'in progress',
  //           owner: 200,
  //         })
  //       );
  //     }),
  //     rest.get(`https://www.miro.com/who_am_i`, (req, res, ctx) => {
  //       return res(ctx.json({ id: 1, name: 'user #1' }));
  //     })
  //   );

  //   const result = setToDone(todoId);
  //   await expect(result).rejects.toMatchInlineSnapshot();
  // });
});

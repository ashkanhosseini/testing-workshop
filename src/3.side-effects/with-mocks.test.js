import axios from 'axios';
import setToDone, { BASE_URL } from './set-todo-to-done';

jest.mock('axios');

describe('setToDone', () => {
  it('should throw when todo item does not exist', () => {
    axios.get.mockResolvedValueOnce({ data: null }); //Promise<any>

    expect(setToDone(33)).rejects.toMatchInlineSnapshot(
      `[Error: item with id 33 does not exist]`
    );

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/todo/33`);
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('should set todo as done', async () => {
    const id = 34;
    axios.get.mockResolvedValueOnce({
      data: { title: 'some item', id, status: 'in progress' },
    });

    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const data = await setToDone(id);

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/done`, { id });
    expect(data).toEqual({ success: true });
  });
});

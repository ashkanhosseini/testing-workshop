import axios from 'axios';
export const BASE_URL = 'https://www.mytodoservice.com';

const setToDone = async (id) => {
  const { data: todo } = await axios.get(`${BASE_URL}/todo/${id}`);
  if (!todo) {
    throw new Error(`item with id ${id} does not exist`);
  }

  // {success: true}
  const { data: response } = await axios.post(`${BASE_URL}/done`, { id });

  return response;
};

export default setToDone;

// * track
// const track = (event, data) => {
//   return axios.post(`https://www.miro.com/track/${event}`, data);
// };

// * get user id
// const getCurrentUserId = () => {
//   // Get user from session/jwt/etc
//   // returns {data:  { id, name, }}
//   return axios.get(`https://www.miro.com/who_am_i`); // Easy 😎
// };

// TODO: check if todo owner is the same as the current user and throw
// const { data: user } = await getCurrentUserId();
// if (user.id !== todo.owner) {
//   throw new Error('Only owner allowed to change the status');
// }

// TODO: Track data
// track('user_set_to_do', { todoId: todo.id });

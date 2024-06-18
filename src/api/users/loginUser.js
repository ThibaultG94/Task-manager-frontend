import axios from "axios";

export async function login(API_URL, email, password) {
  const res = await axios.post(
    `${API_URL}/users/login`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );

  const token = res.data.token;
  const refreshToken = res.data.refreshToken;
  document.cookie = `token=${token}`;
  document.cookie = `refreshToken=${refreshToken}`;

  return res;
}

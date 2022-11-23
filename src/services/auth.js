// import 'dotenv/config'

const registerPA = async ({ email, name, password, confirmPassword }) => {
  console.log(process.env.API_URL);

  const response = await fetch(process.env.API_URL + `/api/user`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ email, password, user_name: name }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const loginPA = async ({ email, password }) => {
  const response = await fetch(process.env.API_URL + `/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ email, password }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const forgotPasswordRequest = async ({ email }) => {
  const response = await fetch(process.env.API_URL + `/api/user/forgotten`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ email }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const validateForgotPasswordToken = async ({ token }) => {
  const response = await fetch(
    process.env.API_URL + `/api/user/reset?token=${token}`,
    {
      method: "GET",
      headers: { "Content-Type": "text/plain" },
    },
  );

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const changePassword = async ({ token, password }) => {
  const response = await fetch(process.env.API_URL + `/api/user/reset`, {
    method: "PUT",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ token, password }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

export {
  registerPA,
  loginPA,
  forgotPasswordRequest,
  validateForgotPasswordToken,
  changePassword,
};

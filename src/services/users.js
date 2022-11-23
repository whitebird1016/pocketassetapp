const getNonceForUser = async function (address) {
  console.log(process.env.API_URL);
  console.log("going to get nonce for this address", address);
  const response = await fetch(process.env.API_URL + `/api/user/${address}`, {
    method: "GET",
    // headers: {'Content-Type': 'application/json'},
    // body: JSON.stringify({ address })
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const authenticateUserWithSignedMessage = async function (address, message) {
  const response = await fetch(process.env.API_URL + `/api/auth/`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ address, message }),
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const getUserById = async (token, userId) => {
  const response = await fetch(process.env.API_URL + `/api/user?id=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const setTasksTimeout = async (token) => {
  const response = await fetch(process.env.API_URL + `/api/user/timeout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const setIgnoreTask = async (token, ignored_tasks) => {
  // const response = await fetch(
  //   process.env.API_URL + `/api/user/ignored_tasks `,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       ignored_tasks: ignored_tasks,
  //     }),
  //   },
  // );
  // if (response && response.ok) {
  //   return await response.json();
  // }
  // throw new Error(`Error with code ${response?.status}`);
};

const getTasksTimeout = async (token) => {
  const response = await fetch(process.env.API_URL + `/api/user/timeout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const updateOwnerProfile = async (token, id, name) => {
  const response = await fetch(process.env.API_URL + `/api/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: id,
      user: {
        user_name: name,
      },
    }),
  });

  if (response && response.ok) {
    return await response.json();
  }
  console.log("response :>> ", response);
  throw new Error(`Error with code ${response?.status}`);
};

const updateProfile = async (token, id, values) => {
  console.log("values.name :>> ", values.name);
  console.log("values :>> ", values);
  const response = await fetch(process.env.API_URL + `/api/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: id,
      user: {
        user_name: values.name,
        country: values.country,
        payout_address: values.payout,
      },
    }),
  });

  if (response && response.ok) {
    return await response.json();
  }
  console.log("response :>> ", response);
  throw new Error(`Error with code ${response?.status}`);
};

export {
  updateOwnerProfile,
  updateProfile,
  getNonceForUser,
  authenticateUserWithSignedMessage,
  getUserById,
  setTasksTimeout,
  getTasksTimeout,
  setIgnoreTask,
};

const getNotifications = async (token) => {
  const res = await fetch(process.env.API_URL + `/api/notification/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res && res.ok) {
    return await res.json();
  }

  throw new Error(`Error with code ${response?.status}`);
};

const updateNotifications = async(token, notification_id) => {
  const res = await fetch(process.env.API_URL + `/api/notification/archive/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      notification_id:notification_id,
    })
  })
console.log('res :>> ', res);
  if (res && res.ok) {
    return await res.json();
  }

  throw new Error(`Error with code ${res?.status}`);
}
export { getNotifications, updateNotifications };

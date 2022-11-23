const uploadFiles = async (files, token) => {
  var formData = new FormData();
  console.log("files to add to form", files);
  if (!files.length) {
    return { success: false, message: "Please, select files for upload." };
  }
  for (let i = 0; i < files.length; i++) {
    // formData.append(files[i].name, files[i])
    formData.append("attach", files[i]);
  }
  // console.log(formData);
  const promise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://pocket-assistant-api.vercel.app/api/task/file");
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        // console.log(xhr.response);
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send(formData);
  });
  return promise
    .then((response) => {
      // console.log(response);
      return JSON.parse(response);
    })
    .catch((error) => {
      // console.error(error);
      return {
        success: "false",
        message: "Upload did not succeed. Status returned: " + error,
      };
    });

  /*
    console.log(result);
  if (result.success) {
    return result;
  } else {
    console.log("upload failed with this status: ", result);
    return {
      success: "false",
      message: "Upload did not succeed. Status returned: ",
    };
  }
  */

  /*
  const response = await fetch(process.env.API_URL + `/api/task/file`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  console.log(response);
  if (response && response.ok) {
    return await response.json();
  }

  throw new Error(`Error with code ${response?.status}`);
  */
};

export { uploadFiles };

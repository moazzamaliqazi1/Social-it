const API_URL = "https://dummyjson.com";
const LOCAL_STORAGE_LOGIN_KEY = "USER";

const onLoadLogin = () => {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY));
  if (user && user.token) {
    window.location.href = "./Index.html";
  }
};

const validateCredentials = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    if (username && password) {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        JSON.stringify({
          username: username,
          password: password,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response);
      const { data } = response;
      localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(data));
      // window.location.reload();
    }
  } catch (exception) {
    Swal.fire({
      text: exception.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error(exception);
  }
};

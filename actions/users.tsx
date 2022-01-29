import axios from "./../configs/axios";

// login function
export const login = async (
  props: any,
  dispatch: any,
  router: any
): Promise<any> => {
  try {
    const res = await axios.post("/users/login", {
      email: props.email,
      password: props.password,
    });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "SET_USER",
        user: res.data,
      });
      router.replace("/");
    } else {
      alert("Something went wrong!");
      throw new Error("Token is not stored locally!");
    }
  } catch (error) {
    alert("Something went wrong!");
    console.log(error);
  }
};

interface Data {
  pageNumber: number | null;
  rowsPerPage: number | null;
}

// get table function
export const getTableData = async (data: Data, dispatch: any): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    const res = await axios.get("/articles", {
      params: { limit: data.rowsPerPage, page: data.pageNumber },
    });
    dispatch({
      type: "SET_TABLEDATA",
      tableData: res.data.data,
      count: res.data.count,
    });
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};

// article creation Function
export const handleArticleCreate = async (
  event: React.FormEvent<HTMLFormElement>,
  dispatch: any
) => {
  try {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    await axios.post("/articles/create", {
      title: data.get("title"),
      content: data.get("content"),
    });
    getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
  } catch (error) {
    alert("Something went wrong!");
    console.log(error);
  }
};

export const handleLogout = async (router: any): Promise<any> => {
  try {
    await axios.post("/users/logout");
    localStorage.removeItem("token");
    router.replace("/login");
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};

// review handling function
export const handleReview = async (
  id: any,
  remarks: any,
  dispatch: any,
  action: any
) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    await axios.post("/articles/review", {
      id,
      remarks: remarks,
      action,
    });
    await getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};

// user data fetching function (data passed: token)
export const getLoggedInUserData = async (
  dispatch: any,
  router: any
): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      const res = await axios.get("/users/getUser");
      dispatch({ type: "SET_USER", user: res.data.data });
      getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
    }
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};

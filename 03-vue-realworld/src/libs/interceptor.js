import axois from "axios";

export default function(vm) {
  axois.interceptors.request.use(req => {
    const token = localStorage.getItem("user-token");
    if (token) {
      req.headers.Authrization = token;
    }
    return req;
  });

  axois.interceptors.response.use(
    res => {
      console.log(res.data);
      if (res.data.status === 0) {
        vm.$store.dispatch("user/logout");
        vm.$router.push("/login");
      }
      return res.data;
    },
    err => {
      console.log(err.response.status);
      return err.response.status;
    }
  );
}

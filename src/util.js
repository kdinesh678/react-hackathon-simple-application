export function getUserDetails() {
  return {
    userId: window.localStorage.getItem("empId"),
    username: window.localStorage.getItem("empName"),
  };
}

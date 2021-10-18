export function getUserDetails() {
  return {
    userId: window.localStorage.getItem("empId"),
    username: window.localStorage.getItem("empName"),
  };
}

export function formatDate(date) {
  const dateObj = new Date(date);

  return `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getYear()}`;
}

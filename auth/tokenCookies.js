import cookies from "js-cookie";

export const setTokenCookie = (token) => {
    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ token }),
    });
  };
  
  
  export const removeTokenCookie = () => {
    fetch("/api/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };
  
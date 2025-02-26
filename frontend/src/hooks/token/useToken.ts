import { useState, useEffect } from "react";

const useToken = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve token from localStorage when the component mounts
    const storedToken = localStorage.getItem("financial-auth-token");
    setToken(storedToken); // Update state with the token if it exists
  }, []);

  return token;
};

export default useToken;

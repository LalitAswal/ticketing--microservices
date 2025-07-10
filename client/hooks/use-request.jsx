import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if(onSuccess){
        onSuccess(response.data) // TODO for future use
      }
      return response.data;
    } catch (error) {
      const backendErrors = error?.response?.data?.errors;
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {backendErrors?.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}

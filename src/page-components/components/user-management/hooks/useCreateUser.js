import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useCreateUser = ({
  userInfo = {},
  getAllUsers = () => {},
  onReset = () => {},
  onCloseModal = () => {},
}) => {
  const navigate = useNavigate();
  const [isUserCreating, setIsUserCreating] = useState(false);
  const {
    username,
    password,
    userType,
    name,
    mobileNumber,
    email,
    age,
    signature,
    stamp,
    photo,
    id,
    headId,
    registrationNumber,
  } = userInfo || {};

  const onAddUser = async (method = "post") => {
    setIsUserCreating(true);
    const token = localStorage.getItem("authToken");
    let api = `api/v1/mmu/auth/user`;
    if (method === "put") {
      api = `api/v1/mmu/auth/user/${id}`;
    }
    try {
      await axios[method](
        `${REACT_APP_API_KEY}/${api}`,
        {
          username,
          password: password,
          headId: userType === "MMUSTAFF" ? headId : undefined,
          userType: userType,
          name,
          mobileNumber,
          email,
          age: +age,
          signature,
          stamp,
          photo,
          registrationNo: registrationNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      if (method === "put") {
        toast.success("User Updated Successfully !");
      } else {
        toast.success("User created successfully !");
      }
      getAllUsers();
      setTimeout(() => {
        onCloseModal();
        onReset();
      }, 1000);
    } catch (error) {
      console.error(error, "error");
      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("Oops, something went wrong");
      } else {
        const messageContent = Array.isArray(errorMessage) ? (
          <ul className="ms-2 list-disc">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMessage || "An unknown error occurred"
        );
        toast.error(messageContent);
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } finally {
      setIsUserCreating(false);
    }
  };

  return {
    onAddUser,
    isUserCreating,
  };
};

export default useCreateUser;

import { signupType } from "@rglair/common-blogapp";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState<signupType>({
    email: "",
    name: "",
    password: "",
  });
  const [showError, setShowError] = useState("")

  const handleSubmit = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://backend.rglairgamer.workers.dev/api/v1/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    };
    try {
      const response = await axios(config);
      // console.log(response.data.token);
      localStorage.setItem("token",response.data.token)
      navigate("/")
    } catch (error:any) {
      console.log("an error accoured")
      if(error.response.data.msg){
        setShowError(error.response.data.msg)
      }
      
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-2">Create an account</h1>
        <p className="text-gray-600">
          Already have an account?
          <Link to={"/signin"}>
          <span className="underline">Login</span>
          </Link>

        </p>
        <LabelledInput
          label={"Name"}
          placeholder={"Enter your name"}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <LabelledInput
          label={"Email"}
          placeholder={"Enter your email"}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <LabelledInput
          label={"Password"}
          placeholder={"Enter your password"}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <p className=" my-2 text-red-500 font-bold">

        {showError}
        </p>
        <button
          className="my-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="block my-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={label === "Password" ? "password" : "text"}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}

export default Auth;

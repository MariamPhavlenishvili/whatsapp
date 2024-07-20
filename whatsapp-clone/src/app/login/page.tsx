"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Users } from "@/interfaces/users.interface";
import Cookies from "js-cookie";
import { getUserByName } from "@/services/userService";

type FormData = {
  name: string;
};

const Login = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const [userData, setUserData] = useState<Users | []>([]);

  useEffect(() => {
    const name = watch("name") || "";
    const data = getUserByName(name);
    setUserData(data || []);
  }, [watch("name")]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValue("name", e.target.value);
  };

  const onSubmit = () => {
    if (userData) {
      Cookies.set("sessionUser", JSON.stringify(userData)); 
      router.push("/");
    } else {
      setError("User Not Found");
    }
  };

  const onClickSignUp = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center gap-2">
          <h2 className="mt-6 text-center text-3xl font-bold">Sign in to</h2>
          <h2 className="mt-6 text-center text-3xl font-bold text-primary-400">
            WhatsApp
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                onChange={onChange}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-300 focus:border-secondary-300 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
              {error.length > 0 && (
                <p className="text-sm text-red-500 px-3 pt-2 ">{error}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex my-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-300 hover:bg-secondary-300"
            >
              Sign in
            </button>
            <button
              onClick={onClickSignUp}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-400 hover:bg-secondary-400"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


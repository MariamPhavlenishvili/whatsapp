"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, UserForm } from "@/schema";

import { generateId } from "@/helpers/generateId";
import { users } from "@/data/users/users";

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: UserForm) => {
    if (data.name && data.email) {
      const user = {
        id: generateId(users),
        name: data.name,
        email: data.email,
      };

      const allUsers = [...users, user];

      localStorage.setItem("users", JSON.stringify(allUsers));
      router.push("/login");
    }
    // Perform sign-up logic here, e.g., call an API or update state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center gap-2">
          <h2 className="mt-6 text-center text-3xl font-bold">Sign up to</h2>
          <h2 className="mt-6 text-center text-3xl font-bold text-primary-400">
            WhatsApp
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="text-primary-500">
              Enter Name:
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-300 focus:border-secondary-300 focus:z-10 sm:text-sm"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 px-3 pt-2 ">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-primary-500">
              Enter Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-secondary-300 focus:border-secondary-300 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 px-3 pt-2 ">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-300 hover:bg-secondary-300"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

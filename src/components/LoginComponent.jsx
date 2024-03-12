import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthService from "../utils/authService";
import Field from "./Field";

export default function LoginComponent() {
  const { login: loginHandler } = useAuthService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      loginHandler.mutate(formData);
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form action="" onSubmit={handleSubmit(submitForm)}>
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", { required: "Email ID is Required" })}
                className={`auth-input ${
                  !!errors.email ? "border-red-500" : "border-white/20"
                }`}
                type="email"
                name="email"
                id="email"
                value={"aa@mail.com"}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Your password must be at least 8 characters",
                  },
                })}
                value={"password"}
                className={`auth-input ${
                  !!errors.password ? "border-red-500" : "border-white/20"
                }`}
                type="password"
                name="password"
                id="password"
              />
            </Field>
            <p className="mb-6">{errors?.root?.random?.message}</p>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

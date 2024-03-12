import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Field from './Field';
import useAuthService from '../utils/authService';

export default function RegisterComponent() {
  const { register: registerHandler } = useAuthService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    // console.log(formData);
    try {
      
      let response = registerHandler.mutate(formData);
      console.log({response});

      if (response.status === 201) {
        navigate("/login");
      }
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
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form
            action=""
            autoComplete="off"
            onSubmit={handleSubmit(submitForm)}
          >
            <Field label="First Name" error={errors.firstName}>
              <input
                {...register("firstName", {
                  required: "First Name is Required",
                })}
                className={`auth-input ${
                  !!errors.firstName ? "border-red-500" : "border-white/20"
                }`}
                type="firstName"
                name="firstName"
                id="firstName"
              />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
              <input
                {...register("lastName")}
                className={`auth-input ${
                  !!errors.lastName ? "border-red-500" : "border-white/20"
                }`}
                type="lastName"
                name="lastName"
                id="lastName"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", { required: "Email ID is Required" })}
                className={`auth-input ${
                  !!errors.email ? "border-red-500" : "border-white/20"
                }`}
                type="email"
                name="email"
                id="email"
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
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

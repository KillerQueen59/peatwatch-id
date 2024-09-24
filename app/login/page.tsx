"use client";

import InputField from "@/components/InputField";
import Image from "next/image";
import Button, { ButtonSize } from "@/components/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validationSchema } from "./loginschema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

export default function Login() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Set up validation with Yup
  });
  // Handle form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        throw new Error(errorData.error || "Login failed");
      }
      const result = await response.json();
      console.log(result); // You can handle user data here (e.g., storing in context)

      router.replace("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form
      className="bg-white w-[590px] m-auto self-center rounded-3xl p-14 shadow"
      onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
    >
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="flex space-x-1.5 mb-12 w-fit mx-auto">
        <Image
          src="/logo.svg"
          alt="Mamen Logo"
          width={135}
          height={84}
          priority
        />
      </div>
      <InputField
        control={control}
        name={"email"}
        label={"Email"}
        placeholder={"Input email"}
        className="mt-6"
      />
      <InputField
        control={control}
        name={"password"}
        label={"Password"}
        type="password"
        placeholder={"Input password"}
        error="sdads" // Handle errors as needed
        className="mt-2"
      />
      <div className="my-5 flex"></div>
      <Button
        type="submit" // Change to "submit" to trigger form submission
        label="Login"
        buttonSize={ButtonSize.LARGE}
        fullWidth
        onClick={() => {}}
      />
    </form>
  );
}

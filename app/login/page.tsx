"use client";

import InputField from "@/components/InputField";
import Image from "next/image";
import Button, { ButtonSize } from "@/components/Button";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { control } = useForm();
  return (
    <form
      className="bg-white w-[590px] m-auto self-center rounded-3xl p-14 shadow"
      onSubmit={() => {}}>
      <div className="flex 	space-x-1.5 mb-12 w-fit mx-auto">
        <Image
          src="/logo.svg"
          alt="Mamen Logo"
          width={135}
          height={84}
          priority
        />
      </div>
      <div className="font-semibold text-xl text-gray-80">
        Nice to see you again
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
        error="sdads"
        className="mt-2"
      />
      <div className="my-5 flex"></div>

      <Button
        type="submit"
        label="Login"
        onClick={() => {}}
        buttonSize={ButtonSize.LARGE}
        fullWidth
      />
    </form>
  );
}

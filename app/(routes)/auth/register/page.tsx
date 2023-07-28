"use client";
import { prompt } from "@/app/fonts";
import { AuthInput, CustomButton } from "@/components";
import { GetServerSidePropsContext } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function RegisterPage(): React.JSX.Element {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const { push } = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      push("/notes");
      return;
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (form.password != form.confirm) {
        setError("Passwords are not the same");
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name,
        }),
      });

      setForm({ username: "", password: "", name: "", confirm: "" });
      if (res.ok) {
        push("/login");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <main className="w-screen flex justify-center">
      <div className="mx-[30px] sm:min-w-[480px] sm:max-w-[540px]">
        <h1 className={`mt-[90px] ${prompt.className} font-medium text-[50px]`}>
          Sign-up
        </h1>
        <form onSubmit={onSubmit} className="mt-[70px]">
          <input name="csrfToken" type="hidden" />
          <AuthInput placeholder="Username" />
          <AuthInput
            placeholder="Full name"
            type="text"
            className="mt-[15px]"
            onChange={handleChange}
          />
          <AuthInput
            placeholder="Password"
            type="password"
            className="mt-[15px]"
            onChange={handleChange}
          />
          <AuthInput
            placeholder="Confirm password"
            type="password"
            className="mt-[15px] mb-[10px]"
            name="confirm"
            onChange={handleChange}
          />
          <Link
            className="small-caps text-[23px] text-[#242424] opacity-[0.5]"
            href="/auth/login"
          >
            Already have an account?
          </Link>
          <div className="flex mt-[55px] sm:gap-[23px] justify-center max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:mt-[80px] mb-[70px]">
            <CustomButton text="Sign up" type="submit" color="primary" />
          </div>
        </form>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
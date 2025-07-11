"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { getMeHandle, loginHandle } from "@/services/AuthService";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setSession } from "@/utils/token";
import ThemeToggle from "@/commons/components/ThemeToggle";
import LocaleDropdown from "@/commons/components/LocaleDropdown";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Username must be at least 6 characters." }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const methods = useForm();
  const t = useTranslations("login");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "quynhuser@xem.edu.vn",
      password: "Soc@123456",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const login_data = await loginHandle(values);
    if (login_data.access_token) {
      setSession(login_data);
      const user_data = await getMeHandle();
      sessionStorage.setItem("user", JSON.stringify(user_data));
      router.push("/home");
    } else {
      toast.error("Đăng nhập không thành công !");
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast("Chức năng đang phát triển");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=1080&width=1920&query=modern%20city%20skyline%20at%20sunset)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 text-white hover:bg-white/20"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="absolute top-4 right-4 z-10 text-white z-10">
        <ThemeToggle />
      </div>
      <div className="absolute top-4 right-20 z-10 text-white z-10">
        <LocaleDropdown />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="dark:bg-unprimary bg-white backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">{t("title")}</h1>
            <p className="text-primary">{t("subtitle")}</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-11 border-gray-200 hover:bg-gray-50 bg-white/80 text-sm text-primary"
              onClick={() => handleSocialLogin("Google")}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("login_with_google")}
            </Button>

            {/* Apple Login */}
            <Button
              variant="outline"
              className="w-full h-11 border-gray-200 hover:bg-gray-50 bg-white/80 text-sm text-primary"
              onClick={() => handleSocialLogin("Apple")}
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t("login_with_apple")}
            </Button>

            {/* Facebook Login */}
            <Button
              variant="outline"
              className="w-full h-11 border-gray-200 hover:bg-gray-50 bg-white/80 text-sm text-primary"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              {t("login_with_facebook")}
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500">
              {t("or_login_with_email")}
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            id="email"
                            type={"text"}
                            className="pl-10 pr-10 h-11 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10 h-11 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t("forgot_password")}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl"
                disabled={form.formState.isLoading}
              >
                {form.formState.isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("logging_in")}
                  </div>
                ) : (
                  t("login")
                )}
              </Button>
            </form>
          </FormProvider>
          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("no_account")} {" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {t("register_now")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

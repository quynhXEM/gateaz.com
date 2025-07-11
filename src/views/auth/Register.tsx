"use client";

import type React from "react";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { Mail, User, ArrowLeft, VenusAndMars, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "@/commons/components/ThemeToggle";
import { useTheme } from "next-themes";
import {
  getMeHandle,
  loginHandle,
  registerHandle,
} from "@/services/AuthService";
import { toast } from "react-toastify";
import { setSession } from "@/utils/token";
const registerSchema = z.object({
  gender: z.string().min(1, "require_fill_field"),
  full_name: z.string().min(1, "require_fill_field"),
  phone: z.string().min(1, "require_fill_field"),
  email: z.string().email("require_fill_field"),
  username: z.string().min(1, "require_fill_field"),
  password: z.string().min(6, "require_fill_field"),
  term: z.boolean().refine((data) => data, {
    message: "require_agree",
  }),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: "male",
      full_name: "Nguyễn Văn A",
      phone: "2934782",
      email: "nguyena@gmail.com",
      username: "vana1",
      password: "Vana@1",
      term: false,
    },
  });
  const router = useRouter();
  const theme = useTheme();

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    const register = await registerHandle({
      email: values?.email,
      password: values?.password,
      username: values?.username,
      full_name: values?.full_name,
      phone: values?.phone,
      gender: values?.gender,
      language: "vi-VN",
      country_code: "VN",
    });

    if (register?.errors) {
      toast(
        register?.errors[0].extensions?.field +
          " đã có người dùng hoặc không hợp lệ !"
      );
    } else {
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
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=1080&width=1920&query=modern%20office%20building%20with%20glass%20facade)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 text-white z-10"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="absolute top-4 right-4 z-10 text-white z-10">
        <ThemeToggle />
      </div>
      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="dark:bg-unprimary bg-white backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-primary">
              Đăng ký
            </h1>
            <p className="text-primary">Tạo tài khoản mới để bắt đầu</p>
          </div>

          {/* Form */}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onRegister)}
              className="space-y-4"
            >
              {/* Info Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="full_name"
                  className="text-sm font-medium text-gray-700 text-primary"
                >
                  Thông tin cá nhân
                </Label>
                <div className="flex gap-2 flex-row xs:flex-col">
                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <VenusAndMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                            <Select
                              {...field}
                              value={field.value || "male"}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="pl-10 h-16 text-sm">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-full">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                            <Input
                              {...field}
                              id="full_name"
                              type="text"
                              placeholder="Enter full_name"
                              className="pl-10 pr-20 h-9 w-full text-sm"
                              required
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          inputStyle={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          buttonStyle={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          containerStyle={{
                            backgroundColor: "transparent",
                            border: `1px solid ${
                              theme.theme === "dark"
                                ? "rgb(63, 63, 63)"
                                : "rgb(230, 230, 230)"
                            }`,
                            borderRadius: 8,
                          }}
                          country={"vn"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Input
                            {...field}
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            className="pl-10 pr-20 h-9 w-full text-sm"
                            required
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Account Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 text-primary"
                >
                  Thông tin tài khoản
                </Label>
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Input
                            {...field}
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            className="pl-10 pr-20 h-9 w-full text-sm"
                            required
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="pl-10 pr-20 h-9 w-full text-sm"
                            required
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex gap-2">
                        <FormControl>
                          <Checkbox
                            {...field}
                            id="term"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 flex-shrink-0"
                          />
                        </FormControl>
                        <Label
                          htmlFor="terms"
                          className="text-sm text-primary leading-relaxed cursor-pointer"
                        >
                          <span>
                            <span>Tôi đồng ý với </span>
                            <span className="text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline">
                              Điều khoản sử dụng
                            </span>
                            <span> và </span>
                            <span className="text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline">
                              Chính sách bảo mật
                            </span>
                          </span>
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl"
                disabled={form.formState.isLoading}
              >
                {form.formState.isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang đăng ký...
                  </div>
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </form>
          </FormProvider>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import { Mail, User, ArrowLeft, VenusAndMars, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
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
import LocaleDropdown from "@/commons/components/LocaleDropdown";
import { useLocale, useTranslations } from "next-intl";
import { useNotificationModal } from "@/contexts/NotificationModalContext";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {showSuccess, showError} = useNotificationModal();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("register");
  const registerSchema = z.object({
    gender: z.string().min(1, t("require_fill_field")),
    full_name: z.string().min(1, t("require_fill_field")),
    phone: z.string().min(1, t("require_fill_field")),
    email: z.string().email(t("require_fill_field")),
    username: z
      .string()
      .min(1, t("require_fill_field"))
      .regex(/^[a-zA-Z0-9]+$/, t("username_alphanumeric")),
    password: z.string().min(6, t("require_fill_field")),
    term: z.boolean().refine((data) => data, {
      message: t("require_agree"),
    }),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: "male",
      full_name: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      term: false,
    },
  });
  const router = useRouter();
  const theme = useTheme();
  const locale = useLocale();

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const register = await registerHandle({
      email: values?.email.toLocaleLowerCase(),
      password: values?.password,
      username: values?.username.toLocaleLowerCase(),
      full_name: values?.full_name,
      phone: values?.phone,
      gender: values?.gender,
      language: locale,
    });

    if (!register) {
      showError({
        title: "error_title",
        message: t("error_register_field", { field: "" }),
        autoClose: true,
      });
      setIsLoading(false);
    } else {
      const login_data = await loginHandle(values);
      if (login_data && (login_data as any).access_token) {
        setSession(login_data);
        const user_data = await getMeHandle();
        sessionStorage.setItem("user", JSON.stringify(user_data));
        router.push("/home");
      } else {
        showError({
          title: "error_title",
          message: t("error_login_failed"),
          autoClose: true,
        });
        router.push("/login");
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
      <div className="absolute top-4 right-20 z-10 text-white z-10">
        <LocaleDropdown />
      </div>
      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="dark:bg-unprimary bg-white backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-primary">
              {t("title")}
            </h1>
            <p className="text-primary">{t("subtitle")}</p>
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
                  {t("personal_info")}
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
                                <SelectValue placeholder={t("gender")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">
                                  {t("male")}
                                </SelectItem>
                                <SelectItem value="female">
                                  {t("female")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
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
                              placeholder={t("full_name_placeholder")}
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
                          {...field}
                          defaultCountry="VN"
                          placeholder={t("phone_placeholder")}
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
                            placeholder={t("email_placeholder")}
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
                  {t("account_info")}
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
                            placeholder={t("username_placeholder")}
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
                            placeholder={t("password_placeholder")}
                            className="pl-10 h-9 w-full text-sm"
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
                      <div className="flex gap-2 cursor-pointer">
                        <FormControl>
                          <Checkbox
                            id="term"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 flex-shrink-0 cursor-pointer"
                            name={field.name}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          />
                        </FormControl>
                        <Label
                          htmlFor="term"
                          className="text-sm text-primary leading-relaxed cursor-pointer"
                        >
                          <span>{t("agree_prefix")}</span>
                          <span className="text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline">
                            <Link
                              href={"/article/terms-of-service"}
                              target="_blank"
                            >
                              {t("terms")}
                            </Link>
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
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("registering")}
                  </div>
                ) : (
                  t("register")
                )}
              </Button>
            </form>
          </FormProvider>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("already_have_account")}{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {t("login_now")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

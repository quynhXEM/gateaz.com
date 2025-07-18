"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
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
import ThemeToggle from "@/commons/components/ThemeToggle";
import LocaleDropdown from "@/commons/components/LocaleDropdown";
import { useTranslations } from "next-intl";
import { useNotificationModal } from "@/contexts/NotificationModalContext";

export default function FogotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const methods = useForm();
  const { showSuccess, showError } = useNotificationModal();
  const t = useTranslations("forgot");

  const loginSchema = z.object({
    email: z.string().email(t("error_invalid_email")),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const request = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (request.ok) {
      showSuccess({
        title: "success_title",
        message: "reset_password_success",
        autoClose: true,
      });
      router.push("/login");
    } else
      showError({
        title: "error_title",
        message: "reset_password_failed",
        autoClose: true,
      });
    setIsLoading(false);
  }

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
            <h1 className="text-3xl font-bold text-primary mb-2">
              {t("title")}
            </h1>
            <p className="text-primary">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="">
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
                            placeholder={t("placeholder_email")}
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
              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("send_code")}
                  </div>
                ) : (
                  t("send_code")
                )}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

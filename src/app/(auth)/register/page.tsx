"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useRegister } from "@/app/context/RegisterContext";


const formSchema = z
  .object({
    username: z.string().min(2, "İsim en az 2 karakter olmalidir."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
    passwordConfirm: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
  });

const Registerpage = () => {
  const router =useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { registerUser } = useRegister();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { username, email, password } = values;
  
    const result = await registerUser({ username, email, password });
  
    if (result) {
      router.push("/login");
    }
  
    setIsLoading(false);
  };
  return (
    <div className="p-3 w-full max-w-[1200px] mx-auto mt-26">
      <div className="mx-auto rounded-lg shadow-lg overflow-hidden bg-white md:w-[500px] w-[300px] p-5">
        <h2 className="flex items-center justify-center font-bold text-2xl mb-10 text-pink-900">Üye olmak için doldurunuz</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanici adiniz</FormLabel>
                  <FormControl>
                    <Input className="w-full bg-pink-200" placeholder="shadcn" {...field} />
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
                  <FormLabel>Email Giriniz</FormLabel>
                  <FormControl>
                    <Input className="w-full bg-pink-200" placeholder="example@gamil.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi giriniz</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-full bg-pink-200" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi tekrar giriniz</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-full bg-pink-200" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-gray-600 text-white  dark:bg-gray-300 dark:text-red-600" disabled={isLoading} type="submit">{isLoading ? "Yükleniyor..." : "Üye ol"}</Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Label className="block text-pink-900">Zaten bir hesabiniz var mi?</Label>
          <Link href="/login" className="text-slate-500 mt-2 block">
            Tiklayip giriş yapabilirsiniz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;


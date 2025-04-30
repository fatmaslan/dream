"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {useState } from "react";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
});

const Loginpage = () => {
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      
    },
  });
  const router = useRouter();
  const { loginUser } = useLogin();

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setIsLoading(true);
  const { email, password } = values;

  const result = await loginUser({ email, password });

  if (result) {
    router.push("/");
  }

  setIsLoading(false);
};
  return (
    <div className=" p-3 w-full max-w-[1200px] mx-auto mt-26">
      <div className="mx-auto rounded-lg shadow-lg overflow-hidden bg-white md:w-[500px] w-[300px] p-5  ">
        <h2 className="flex items-center justify-center font-bold sm:text-2xl text-md mb-10 text-pink-900">
          Giriş yapmak için doldurunuz
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Giriniz</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full bg-pink-200"
                      placeholder="example@gamil.com"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      className="w-full bg-pink-200"
                      placeholder="*****"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button  disabled={isLoading} type="submit" className="w-full bg-gray-600 text-white  dark:bg-gray-300 dark:text-red-600">
            {isLoading ? (
                <>
                <Loader2 size={20} className="animate-spin"/>
                Giriş yapiliyor...
                </>
              ) : (
                <>Giriş Yap</>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <Label className="block text-pink-900">Bir hesabiniz yok mu?</Label>
          <Link href="/register" className="mt-2 text-slate-500 block">
            Yeni hesap oluşturmak için tiklayin.
          </Link>
        </div>
        </div>
      </div>

  );
};

export default Loginpage;

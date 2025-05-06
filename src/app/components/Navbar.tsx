"use client";
import React, { useState } from "react";
import { useHeadCategories } from "../../../actions/get";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import SearchBox from "./SearchBox";

import { Loader2 } from "lucide-react";
import { useLogin } from "../context/LoginContext";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Navbar = () => {
  const { products, loading, error } = useHeadCategories();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLogin();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await loginUser({ email, password });

      if (res) {
        setIsLoginOpen(false);
        router.push("/account"); // giriş sonrası yönlendirme
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUserClick = () => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/account");
    } else {
      setIsLoginOpen(true);
    }
  };
  return (
    <div className=" border-b fixed top-0 bg-white z-50 w-full">
      <div className="w-full max-w-[1200px] mx-auto ">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-pink-500"
            >
              {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
            <div className="hidden md:flex flex-row gap-6">
              {products?.map((product) => (
                <Link key={product.id} href={`/category/${product.id}`}>
                  <h2 className="text-lg text-pink-400 hover:bg-pink-100 h-10 flex items-center justify-center p-3">
                    {product.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>

          <Link href={"/"} className="font-bold text-3xl text-pink-500 ">
            DREAM
          </Link>
          <SearchBox />

          <div className="flex flex-row gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center gap-2 hover:text-green-950">
                  <FaRegHeart size={24} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto left-0">
                <DropdownMenuLabel className="text-center font-semibold">
                  Favorilerim
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                  onClick={() => router.push("/favorites")}
                  variant="outline"
                  className="flex w-full items-center justify-center"
                >
                  Favorilerime git
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              onClick={handleUserClick}
              className="cursor-pointer flex items-center gap-2 hover:text-green-950"
            >
              <FaUser size={24} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer hover:text-green-950">
                  <IoBagOutline size={24} />
                  {cart?.items?.length > 0 && (
                    <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                      {cart.items.length}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto left-0">
                <DropdownMenuLabel className="text-center font-semibold space-y-4">
                  {cart?.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-7 items-start border-b pb-7 "
                    >
                      {/* Ürün resmi */}
                      <div className="w-[60px] h-[80px] relative rounded overflow-hidden shrink-0">
                        <Image
                          src={`http://127.0.0.1:8000${item.images}`}
                          alt={item.product.name || "Ürün resmi"}
                          width={180}
                          height={180}
                          className="rounded object-cover w-full h-full"
                        />
                      </div>

                      {/* Ürün adı ve butonlar */}
                      <div className="flex flex-col justify-between flex-1">
                        <div className="text-left  font-medium text-gray-700">
                          {item.product.name}
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="icon">
                            <CiHeart size={16} className="text-pink-600" />
                          </Button>
                          <Button
                            onClick={() => removeFromCart(item.id)}
                            variant="outline"
                            size="icon"
                          >
                            <MdDeleteOutline
                              size={16}
                              className="text-pink-600"
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <Button
                  onClick={() => router.push("/cart")}
                  variant="outline"
                  className="flex w-full items-center justify-center"
                >
                  Sepete git
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
            {products?.map((product) => (
              <div key={product.id} className="py-2">
                <h2 className="text-pink-500">{product.name}</h2>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center font-bold text-green-950">
                Giriş Yap
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="E-posta adresinizi giriniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="outline-none border border-transparent focus:border-transparent focus:ring-0 w-full rounded-md text-pink-950 px-2 py-2"
              />
              <Input
                placeholder="Şifrenizi giriniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="outline-none border border-transparent focus:border-transparent focus:ring-0 w-full rounded-md text-pink-950 px-2 py-2"
              />
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                type="submit"
                className="w-full bg-gray-600 text-white  dark:bg-gray-300 dark:text-red-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>Giriş Yap</>
                )}
              </Button>
            </div>
            <DialogFooter>
              <p className="text-sm text-center">
                Henüz kayit olmadiniz mi?{" "}
                <Link href="/register" className="text-pink-600">
                  Kayit Ol
                </Link>
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;

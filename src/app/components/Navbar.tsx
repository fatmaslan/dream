"use client";
import React, { useState } from "react";
import { useHeadCategories } from "../../../actions/get";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
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

const Navbar = () => {
  const { products, loading, error } = useHeadCategories();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full shadow-md">
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
              <div key={product.id}>
                <h2 className="text-lg text-pink-400 hover:bg-pink-100 h-10 flex items-center justify-center p-3">
                  {product.name}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <Link href={"/"} className="font-bold text-3xl text-pink-500">
          DREAM
        </Link>

        <div className="hidden md:flex relative w-64">
          <Input
            className="w-full rounded-md border-2 border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            placeholder="bir şeyler ara.."
          />
          <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-pink-950" />
        </div>

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
            className="cursor-pointer flex items-center gap-2 hover:text-green-950"
            onClick={() => setIsLoginOpen(true)}
          >
            <FaUser size={24} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer hover:text-green-950">
                <IoBagOutline size={24} />
                <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                  1
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto left-0">
              <DropdownMenuLabel className="text-center font-semibold">
                Sepetiniz
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
              type="email"
              className="outline-none border border-transparent focus:border-transparent focus:ring-0 w-full rounded-md text-pink-950 px-2 py-2"
            />
            <Input
              placeholder="Şifrenizi giriniz"
              type="password"
              className="outline-none border border-transparent focus:border-transparent focus:ring-0 w-full rounded-md text-pink-950 px-2 py-2"
            />
            <Button className="w-full bg-pink-100 text-pink-950 hover:bg-pink-950 hover:text-white transition-all">
              Giriş Yap
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
  );
};

export default Navbar;

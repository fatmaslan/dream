"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
    const placeholders = useMemo(
        () => ["çorap ara..", "pijama ara..", "sütyen ara..", "pantolon ara.."],
        []
      );
    
      const [currentText, setCurrentText] = useState("");
      const [loopIndex, setLoopIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
    
      useEffect(() => {
        const currentPhrase = placeholders[loopIndex % placeholders.length];
    
        let timeout: NodeJS.Timeout;
    
        if (isDeleting) {
          timeout = setTimeout(() => {
            setCurrentText((prev) => prev.slice(0, -1));
          }, 50);
        } else {
          timeout = setTimeout(() => {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          }, 100);
        }
    
        if (!isDeleting && currentText === currentPhrase) {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setLoopIndex((prev) => (prev + 1) % placeholders.length);
        }
    
        return () => clearTimeout(timeout);
      }, [currentText, isDeleting, loopIndex, placeholders]);

  return (
    <div className="hidden md:flex relative w-64">
      <Input
        className="w-full rounded-md border-2 border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        type="text"
        placeholder={currentText}
      />
      <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-pink-950" />
    </div>
  );
};

export default SearchBox;

import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4741A6] text-white border-t-4 border-black">
      <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <p className="font-bold">
            &copy; 2025 GlucoQuest. All Rights Reserved.
          </p>
          <p className="text-sm text-blue-200">
            Your health adventure starts here.
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#F9CE69]">
            <Twitter />
          </a>
          <a href="#" className="hover:text-[#F9CE69]">
            <Instagram />
          </a>
          <a href="#" className="hover:text-[#F9CE69]">
            <Facebook />
          </a>
        </div>
      </div>
    </footer>
  );
}

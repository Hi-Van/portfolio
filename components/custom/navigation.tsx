import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export const Navigation = () => {
  const position = "z-1 fixed w-full top-8 left-1/2 -translate-x-1/2 ";
  const display =
    "flex justify-between items-center bg-card gap-8 px-4 max-w-[800px] h-10 border rounded-md font-medium text-xs ";
  const inlineFlex = "inline-flex justify-center items-center gap-8";

  return (
    <nav className={position + display + "bg-card"}>
      <Link href="/">Vanouphon Sirisouk</Link>
      <div className={inlineFlex}>
        <Link href="/about" className="hover:text-custom-highlight">
          About
        </Link>
        <Link href="/experience" className="hover:text-custom-highlight">
          Experience
        </Link>
        <Link href="/projects" className="hover:text-custom-highlight">
          Featured Work
        </Link>
        <ThemeToggle/>
      </div>
    </nav>
  );
};

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.add("transition-all");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Background animation */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover opacity-10">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav className="absolute top-0 w-full flex justify-between items-center p-6 z-10">
        <h1 className="text-2xl font-bold text-purple-400">Metaverse NFTs</h1>
        <div className="space-x-4 text-sm">
          <Link href="/dashboard" className="hover:text-purple-300">Dashboard</Link>
          <Link href="/my-nfts" className="hover:text-purple-300">My NFTs</Link>
          <Link href="/mint" className="hover:text-purple-300">Mint</Link>
          <Link href="/docs" className="hover:text-purple-300">Docs</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-purple-300 mb-4">
          NFTs with Memory & Soul 🧠✨
        </h2>
        <p className="max-w-xl text-gray-300 mb-6">
          Welcome to the next evolution of NFTs. These are not just tokens — they evolve, remember you, and speak with real personality.
        </p>
        <Link href="/dashboard">
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md">
            🚀 Start Your Journey
          </button>
        </Link>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-8 text-sm text-gray-400 hover:text-purple-300"
        >
          Toggle Theme: {theme === "dark" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
}

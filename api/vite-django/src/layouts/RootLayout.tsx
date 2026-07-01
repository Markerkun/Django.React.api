import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";

const NAV_LINKS = [
    { label: "Головна", to: "/" },
    { label: "Про нас", to: "/about" },
    { label: "Контакти", to: "/contact" },
];

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
);

const RootLayout = () => {
    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ||
                (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    });

    const location = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="
                    mx-4 mt-4 rounded-2xl
                    bg-white/70 dark:bg-slate-900/70
                    backdrop-blur-md
                    border border-slate-200/60 dark:border-slate-700/60
                    shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50
                    transition-colors duration-300
                ">
                    <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group select-none">
                            <div className="
                                w-8 h-8 rounded-xl
                                bg-gradient-to-br from-indigo-500 to-violet-600
                                flex items-center justify-center
                                shadow-md shadow-indigo-500/30
                                group-hover:scale-105 transition-transform duration-200
                            ">
                                <span className="text-white font-bold text-sm">Zk</span>
                            </div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100 text-[15px] tracking-tight">
                                ZdaraviakApp
                            </span>
                        </Link>

                        {/* Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(({ label, to }) => {
                                const active = location.pathname === to;
                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={`
                                            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                                            ${active
                                            ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        }
                                        `}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme toggle */}
                            <button
                                onClick={() => setDark(d => !d)}
                                aria-label="Змінити тему"
                                className="
                                    w-9 h-9 rounded-xl flex items-center justify-center
                                    text-slate-500 dark:text-slate-400
                                    hover:bg-slate-100 dark:hover:bg-slate-800
                                    hover:text-slate-800 dark:hover:text-slate-100
                                    transition-all duration-200
                                "
                            >
                                {dark ? <SunIcon /> : <MoonIcon />}
                            </button>

                            {/* CTA */}
                            <Link className="
                                hidden md:flex items-center gap-2
                                px-4 py-2 rounded-xl text-sm font-medium
                                bg-gradient-to-r from-indigo-500 to-violet-600
                                text-white shadow-md shadow-indigo-500/30
                                hover:shadow-indigo-500/50 hover:scale-[1.02]
                                transition-all duration-200
                            "
                                  to={"/login"}
                            >
                                Увійти
                            </Link>
                            <Link className="
                                hidden md:flex items-center gap-2
                                px-4 py-2 rounded-xl text-sm font-medium
                                bg-gradient-to-r from-indigo-500 to-violet-600
                                text-white shadow-md shadow-indigo-500/30
                                hover:shadow-indigo-500/50 hover:scale-[1.02]
                                transition-all duration-200
                            "
                                  to={"/register"}
                            >
                                Зареєструватись
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="pt-28">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
import { useState } from "react";
import { Link } from "react-router";
import * as z from "zod";
import {useForm, Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EyeIcon = ({ open }: { open: boolean }) => open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
);

const LoginPage = () => {
    const [showPass, setShowPass] = useState(false);
    const [loading,] = useState(false);

        const formSchema = z.object({
        email: z
            .email({ message: "Введіть коректну електронну пошту" }),
        password: z
            .string()
            .min(6, { message: "Пароль повинен містити щонайменше 6 символів" })
            .max(100, { message: "Пароль занадто довгий" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            password: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("Data is good", data);
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setTimeout(() => setLoading(false), 1800);
    // };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950
        flex items-center justify-center px-4 transition-colors duration-300">

            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="
                    absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
                    bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl
                " />
                <div className="
                    absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full
                    bg-violet-400/10 dark:bg-violet-600/10 blur-3xl
                " />
            </div>

            {/* Card */}
            <div className="relative w-full max-w-[400px]">

                 {/*Logo mark */}
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2.5 group select-none">
                        <div className="
                            w-10 h-10 rounded-2xl
                            bg-gradient-to-br from-indigo-500 to-violet-600
                            flex items-center justify-center
                            shadow-lg shadow-indigo-500/30
                            group-hover:scale-105 transition-transform duration-200
                        ">
                            <span className="text-white font-bold text-base">Zk</span>
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100 text-lg tracking-tight">
                            ZdaraviakApp
                        </span>
                    </Link>
                </div>

                {/* Form card */}
                <div className="
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50
                    p-8
                    transition-colors duration-300
                ">
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1">
                            Вхід до акаунту
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Вітаємо назад, здаравяк 👋
                        </p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* Email */}
                                                <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Електронна пошта
                                    </label>
                                    <input
                                        type="email"
                                        {...field}
                                        placeholder="Zdaraviak@zhun.ua"
                                        required
                                        className={`
                    w-full px-4 py-2.5 rounded-xl text-sm
                    bg-slate-50 dark:bg-slate-800
                    border ${fieldState.error ? "border-red-400 dark:border-red-500" : "border-slate-200 dark:border-slate-700"}
                    text-slate-900 dark:text-slate-100
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    outline-none
                    focus:border-indigo-400 dark:focus:border-indigo-500
                    focus:ring-2 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20
                    transition-all duration-200
                `}
                                    />
                                    {fieldState.error && (
                                        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
 

                        {/* Password */}
                       <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Пароль
                                        </label>
                                        <button
                                            type="button"
                                            className="text-xs text-indigo-500 dark:text-indigo-400 hover:underline"
                                        >
                                            Забули пароль?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            {...field}
                                            placeholder="••••••••"
                                            className={`
                                                w-full px-4 py-2.5 pr-11 rounded-xl text-sm
                                                bg-slate-50 dark:bg-slate-800
                                                border ${fieldState.error ? "border-red-400 dark:border-red-500" : "border-slate-200 dark:border-slate-700"}
                                                text-slate-900 dark:text-slate-100
                                                placeholder:text-slate-400 dark:placeholder:text-slate-500
                                                outline-none
                                                focus:border-indigo-400 dark:focus:border-indigo-500
                                                focus:ring-2 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20
                                                transition-all duration-200
                                            `}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPass(v => !v)}
                                            className="
                                                absolute right-3 top-1/2 -translate-y-1/2
                                                text-slate-400 dark:text-slate-500
                                                hover:text-slate-600 dark:hover:text-slate-300
                                                transition-colors duration-150
                                            "
                                            aria-label="Показати пароль"
                                        >
                                            <EyeIcon open={showPass} />
                                        </button>
                                    </div>
                                    {fieldState.error && (
                                        <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <input
                                id="remember"
                                type="checkbox"
                                className="
                                    w-4 h-4 rounded-md border-slate-300 dark:border-slate-600
                                    accent-indigo-500
                                    cursor-pointer
                                "
                            />
                            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                                Запам'ятати мене
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold
                                bg-gradient-to-r from-indigo-500 to-violet-600
                                text-white
                                shadow-md shadow-indigo-500/30
                                hover:shadow-lg hover:shadow-indigo-500/40
                                hover:scale-[1.01]
                                disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
                                transition-all duration-200
                                flex items-center justify-center gap-2
                            "
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Вхід…
                                </>
                            ) : "Увійти"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                        <span className="text-xs text-slate-400 dark:text-slate-600">або</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Google OAuth stub */}
                    <button
                        type="button"
                        className="
                            w-full py-2.5 px-4 rounded-xl text-sm font-medium
                            bg-slate-50 dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            text-slate-700 dark:text-slate-300
                            hover:bg-slate-100 dark:hover:bg-slate-700/70
                            transition-all duration-200
                            flex items-center justify-center gap-2.5
                        "
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Увійти через Google
                    </button>
                </div>

                {/* Register link */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                    Ще немає акаунту?{" "}
                    <Link to="/register" className="text-indigo-500 dark:text-indigo-400 font-medium hover:underline">
                        Зареєструватись
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
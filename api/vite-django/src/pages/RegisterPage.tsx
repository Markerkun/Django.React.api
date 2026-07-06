import { useState } from "react"
import { Link } from "react-router"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "../components/Forminput.tsx"
import { PasswordFormInput } from "../components/PasswordForminput.tsx"
import { ImageFormInput } from "../components/ImageForminput.tsx"
import { useRegistrationUserMutation } from "../services/usersApi.ts"
import type { IUserRegistration } from "../types/users/IUserRegistration.ts"

function RegistrationPage() {
    const [loading, ] = useState(false)
    const [registration] = useRegistrationUserMutation()

    const formSchema = z.object({
        username: z.string().min(1, { message: "Нікнейм обов'язковий" }).max(50, { message: "Нікнейм занадто довгий" }),
        first_name: z.string(),
        last_name: z.string(),
        email: z.email({ message: "Введіть коректну електронну пошту" }),
        password: z.string().min(6, { message: "Пароль повинен містити щонайменше 6 символів" }).max(100, { message: "Пароль занадто довгий" }),
        confirm_password: z.string().min(6, { message: "Пароль повинен містити щонайменше 6 символів" }).max(100, { message: "Пароль занадто довгий" }),
        image: z.instanceof(File, { message: "Будь ласка, завантажте зображення" })
    }).refine((data) => data.password === data.confirm_password, {
        message: "Паролі не збігаються",
        path: ["confirm_password"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            image: null as unknown as File
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>, event?: React.BaseSyntheticEvent) {
        event?.preventDefault()
        try {
            const formData = new FormData()
            formData.append("username", data.username)
            if (data.first_name) {
                formData.append('first_name', data.first_name)
            }
            if (data.last_name) {
                formData.append('last_name', data.last_name)
            }
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("confirm_password", data.confirm_password)
            formData.append('image', data.image)
            const response = await registration(formData as unknown as IUserRegistration).unwrap()
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950
                flex justify-center px-4 transition-colors duration-300">

            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
                            bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl"
                />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full
                            bg-violet-400/10 dark:bg-violet-600/10 blur-3xl"
                />
            </div>

            {/* Card */}
            <div className="relative w-full max-w-[400px]">

                {/*Logo mark */}
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2.5 group select-none">
                        <div className="w-10 h-10 rounded-2xl
                                    bg-gradient-to-br from-indigo-500 to-violet-600
                                    flex items-center justify-center
                                    shadow-lg shadow-indigo-500/30
                                    group-hover:scale-105 transition-transform duration-200"
                        >
                            <span className="text-white font-bold text-base">Zk</span>
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100 text-lg tracking-tight">
                                    ZdaraviakApp
                                </span>
                    </Link>
                </div>

                {/* Form card */}
                <div className="bg-white dark:bg-slate-900
                            border border-slate-200 dark:border-slate-800
                            rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50
                            p-8
                            transition-colors duration-300"
                >
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1">
                            Реєстрація акаунту
                        </h1>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormInput
                            control={form.control}
                            name="username"
                            label="Нікнейм"
                            placeholder="Zdaraviak"
                        />

                        <FormInput
                            control={form.control}
                            name="first_name"
                            label="Ім'я"
                            placeholder=""
                        />

                        <FormInput
                            control={form.control}
                            name="last_name"
                            label="Прізвище"
                            placeholder=""
                        />

                        <FormInput
                            control={form.control}
                            name="email"
                            label="Електронна пошта"
                            placeholder="Zdaraviak@zhun.ua"
                        />

                        {/* Password */}

                        <PasswordFormInput
                            control={form.control}
                            name="password"
                            label="Пароль"
                        />

                        <PasswordFormInput
                            control={form.control}
                            name="confirm_password"
                            label="Повторення паролю"
                        />

                        <ImageFormInput
                            control={form.control}
                            name="image"
                            label="Зображення"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold
                                        bg-gradient-to-r from-indigo-500 to-violet-600
                                        text-white
                                        shadow-md shadow-indigo-500/30
                                        hover:shadow-lg hover:shadow-indigo-500/40
                                        hover:scale-[1.01]
                                        disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
                                        transition-all duration-200
                                        flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Реєстрація…
                                </>
                            ) : "Зареєструватись"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
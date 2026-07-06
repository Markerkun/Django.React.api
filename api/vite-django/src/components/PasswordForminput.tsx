import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"
import { useState } from "react"

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
)

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    label: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
}

export function PasswordFormInput<T extends FieldValues>({
                                                             control,
                                                             name,
                                                             label,
                                                             placeholder = "••••••••"
                                                         }: FormInputProps<T>) {
    const [showPass, setShowPass] = useState(false)
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {label}
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            {...field}
                            placeholder={placeholder}
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
                            className="absolute right-3 top-1/2 -translate-y-1/2
                                text-slate-400 dark:text-slate-500
                                hover:text-slate-600 dark:hover:text-slate-300
                                transition-colors duration-150"
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
    )
}
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    label: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
}

export function FormInput<T extends FieldValues>({
                                                     control,
                                                     name,
                                                     label,
                                                     placeholder,
                                                     type = "text"
                                                 }: FormInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>

                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className={`
                            w-full px-4 py-2.5 rounded-xl text-sm
                            bg-slate-50 dark:bg-slate-800
                            border ${
                            fieldState.error
                                ? "border-red-400 dark:border-red-500"
                                : "border-slate-200 dark:border-slate-700"
                        }
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
    )
}
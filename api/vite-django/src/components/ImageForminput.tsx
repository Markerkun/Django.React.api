import React, { useState, useRef, useEffect } from 'react'
import { Controller } from 'react-hook-form'

interface ImageFormInputProps {
    control: any
    name: string
    label?: string
}

export const ImageFormInput: React.FC<ImageFormInputProps> = ({
                                                                  control,
                                                                  name,
                                                                  label = 'Завантажити зображення',
                                                              }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {

                useEffect(() => {
                    if (!value) {
                        setPreviewUrl(null);
                        if (fileInputRef.current) fileInputRef.current.value = ''
                    }
                }, [value]);

                const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0] || null

                    if (file) {
                        if (!file.type.startsWith('image/')) {
                            alert('Будь ласка, виберіть файл зображення (png, jpeg, webp)!')
                            return;
                        }

                        const objectUrl = URL.createObjectURL(file)
                        setPreviewUrl(objectUrl)
                        onChange(file)
                    } else {
                        setPreviewUrl(null)
                        onChange(null)
                    }
                };

                const handleRemoveImage = () => {
                    setPreviewUrl(null)
                    onChange(null)
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ''
                    }
                };

                return (
                    <div className="flex flex-col gap-1.5 w-full">
                        {label && (
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {label}
                            </label>
                        )}

                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                                id={`image-file-input-${name}`}
                            />

                            {!previewUrl ? (
                                <label
                                    htmlFor={`image-file-input-${name}`}
                                    className={`flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 transition-all duration-200 ${
                                        error
                                            ? 'border-red-400 dark:border-red-500/50'
                                            : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
                                    }`}
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <span className="text-2xl mb-1.5">📸</span>
                                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                            Натисніть, щоб обрати картинку
                                        </p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                                            PNG, JPG або WEBP
                                        </p>
                                    </div>
                                </label>
                            ) : (
                                <div className="relative flex flex-col items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <img
                                        src={previewUrl}
                                        alt="Попередній перегляд"
                                        className="max-h-36 w-full object-contain rounded-lg"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="mt-2.5 px-3 py-1.5 text-[11px] font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm focus:outline-none"
                                    >
                                        Видалити ❌
                                    </button>
                                </div>
                            )}
                        </div>

                        {error && (
                            <span className="text-xs font-medium text-red-500 dark:text-red-400 mt-0.5 pl-0.5">
                {error.message}
              </span>
                        )}
                    </div>
                )
            }}
        />
    )
}
const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">

                {/* Badge */}
                <span className="
                    inline-flex items-center gap-2 mb-6
                    px-3 py-1 rounded-full text-xs font-medium
                    bg-indigo-50 dark:bg-indigo-500/15
                    text-indigo-600 dark:text-indigo-400
                    border border-indigo-100 dark:border-indigo-500/20
                ">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Ласкаво просимо
                </span>

                {/* Heading */}
                <h1 className="
                    text-5xl md:text-6xl font-bold tracking-tight
                    text-slate-900 dark:text-slate-50
                    mb-4
                ">
                    Прівєт,{" "}
                    <span className="
                        bg-gradient-to-r from-indigo-500 to-violet-600
                        bg-clip-text text-transparent
                    ">
                        здаравяк
                    </span>{" "}
                    😼
                </h1>

                <p className="
                    text-lg text-slate-500 dark:text-slate-400
                    max-w-xl mx-auto leading-relaxed
                ">
                    Сучасний інтерфейс зі світлою та темною темою. Натисни на місяць у хедері — і відчуй різницю.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
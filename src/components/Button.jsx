function Button({children, onClick, type = "submit", variant='primary', className=""}){
    const variants = {
        primary:"bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-sm",
        secondary:"bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-colors font-medium",
        danger:"bg-red-500 text-white hover:bg-red-600 transition-colors font-medium shadow-sm",
        success:"bg-green-500 text-white hover:bg-green-600 transition-colors font-medium shadow-sm",
        icon:"p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
    };
    return(
        <button onClick={onClick} type={type} className={`px-6 py-2 rounded-lg ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}
export default Button
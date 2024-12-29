function Button ({className, children, onClick}) {
    return (
        <>
        <button 
        onClick={onClick}
         className={`p-2 bg-black  text-white ${className}`}>{children}</button>
        </>
    )
}

export default Button;
export default function Button({ onClick, children, className='' }) {
    return (
        <button onClick={onClick} className={`p-2 rounded-lg bg-dark ring-2 hover:ring-4 ring-primary text-white text-nowrap ${className}`}>
            {children}
        </button>
    );
}
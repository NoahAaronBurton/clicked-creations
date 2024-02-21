export default function Button({ onClick, children, className }) {
    return (
        <button onClick={onClick} className={`p-2 rounded-lg bg-secondary outline outline-3 text-black text-nowrap ${className}`}>
            {children}
        </button>
    );
}
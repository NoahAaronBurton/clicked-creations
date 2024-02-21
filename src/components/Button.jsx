export default function Button({ onClick, children, className }) {
    return (
        <button onClick={onClick} className={`p-4 rounded-lg bg-secondary outline outline-3 ${className}`}>
            {children}
        </button>
    );
}
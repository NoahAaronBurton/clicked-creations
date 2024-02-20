export default function Landing() {
    function goHome(e) {
        e.preventDefault();
        window.location.href = "/home";
    }
    return (
        <div className="container">
            <h1>Welcome to Clicked Creations</h1>
            <button onClick={goHome}>go to /home</button>
        </div>
    )
}
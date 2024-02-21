export default function Landing() {
    function goHome(e) {
        e.preventDefault();
        window.location.href = "/home";
    }
    return (
        <div className="flex flex-col justify-items-center w-full overflow-y-auto text-black">
            <div id="jumbotron" className="flex flex-col h-full w-full items-center justify-center bg-primary">
                <div className="flex flex-col text-balance items-center ">
                    <h1 className="sm:text-4xl md:text-6xl mb-6 md:mb-20">
                        Clicked Creations
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row md:w-3/4">
                    <div className="flex-1">
                        <p className="text-2xl md:text-4xl text-pretty">HELPING YOUR BRAND GROW WITH ARTIFICIAL INTELLIGENCE</p>
                        <p className="text-lg text-pretty">
                            Web Design, Branding, SEO, Social Media Content, Creating Video & Photos, Blog Posting, Avatar Creation etc. If its digital we can create it!
                        </p>
                    </div>
                    <img className="order-1 flex-1 w-full max-w-xs max-h-xs" src="src/assets/ai-click-gear-yellow.png" />
                </div>
            </div>
            <button onClick={goHome}>Try it out</button>
        </div>
    )
}
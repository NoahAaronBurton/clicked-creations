import Button from './components/Button';

export default function Landing() {   
    function goHome(e) {
        e.preventDefault();
        window.location.href = "/home";
    }
    return (
        <div className="flex flex-col w-full overflow-y-auto">
            <div id="jumbotron" className="flex flex-col px-2 h-full w-full items-center justify-center text-black bg-gradient-to-b from-primary to-[#27272A]">
                <div className="flex justify-between items-center w-full mb-6 md:mb-20">
                    <h1 className="sm:text-4xl md:text-6xl">
                        <strong >Clicked</strong> Creations
                    </h1>
                    <Button onClick={goHome}>
                        Login or Sign Up
                    </Button>
                </div>
                    <div className="flex flex-col justify-center md:flex-row ">
                        <div className="flex-1 space-y-8">
                            <p className="text-2xl md:text-4xl text-pretty mb-12">HELPING YOUR BRAND GROW WITH ARTIFICIAL INTELLIGENCE</p>
                            <p className="text-lg text-pretty">
                                Web Design, Branding, SEO, Social Media Content, Creating Video & Photos, Blog Posting, Avatar Creation etc. If its digital we can create it!
                            </p>
                            <button className="p-4 rounded-lg bg-gradient-to-l from-orange-500 to-red-500 " onClick={goHome}>Try it out</button>
                        </div>
                        <img className="flex-1 w-full max-w-xs max-h-xs" src="src/assets/ai-click-gear-yellow.png" />
                    </div>
            </div>
        </div>
    )
}
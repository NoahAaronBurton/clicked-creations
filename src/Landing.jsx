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
                        <strong>Clicked</strong> Creations
                    </h1>
                    <Button onClick={goHome}>
                        Login or Sign Up
                    </Button>
                </div>
                <div className="flex justify-center">
                    <div className="flex-1  w-3/4">
                        <img className="float-right ml-4  w-1/4 object-contain" src="src/assets/ai-click-gear-yellow.png" />
                        <p className="text-2xl md:text-4xl text-pretty ">HELPING YOUR BRAND GROW WITH ARTIFICIAL INTELLIGENCE</p>
                        <p className="text-lg text-pretty mt-4 mb-4">
                            Web Design, Branding, SEO, Social Media Content, Creating Video & Photos, Blog Posting, Avatar Creation etc. If its digital we can create it!
                        </p>
                    </div>
                </div>
                        <button className="p-4 rounded-lg bg-gradient-to-l from-orange-500 to-red-500 " onClick={goHome}>Try it out</button>
            </div>
        </div>
    )
}
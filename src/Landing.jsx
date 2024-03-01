import Button from './components/Button';
import InfoCard from './components/InfoCard';
import gearImage from './assets/ai-click-gear-yellow.png';

export default function Landing() {   
    // const backgroundImage =  "url('src/assets/grid-mist.png')";

    function goHome(e) {
        e.preventDefault();
        window.location.href = "/home";
    }
    return (
        <div className="flex flex-col w-full overflow-y-auto text-primary">
            <div className="flex flex-col w-full overflow-y-auto " >
                <div className="flex justify-between items-center bg-darker w-full mb-6 md:mb-20">
                    <h1 className="sm:text-2xl md:text-4xl p-4 text-nowrap">
                        <strong>Clicked</strong> Creations
                    </h1>
                    <Button className='mr-2' onClick={goHome}>
                        Login or Sign Up
                    </Button>
                </div>
                <div className="flex justify-center ">
                    <div className="flex-1  w-3/4">
                        {/* <img className="float-right ml-4  w-1/4 object-contain" src="src/assets/ai-click-gear-yellow.png" /> */}
                        <p className="text-2xl md:text-4xl text-center font-bold text-balance">HELPING YOUR BRAND GROW WITH ARTIFICIAL INTELLIGENCE</p>
                        <p className="text-lg text-pretty text-center text-white px-4 mt-4 mb-4">
                            Web Design, Branding, SEO, Social Media Content, Creating Video & Photos, Blog Posting, Avatar Creation etc. If its digital we can create it!
                        </p>
                    </div>
                </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className=" text-2xl md:text-4xl text-balance text-center  mt-4 mb-4 underline decoration-solid decoration-secondary">
                            Marketing Your Product Online Has Never Been Easier
                        </p>
                        <Button className=" mt-6 mb-6" onClick={goHome}>
                            Get Started
                        </Button>
                    </div>
            </div>
            
                <div className="flex flex-col items-center justify-center w-full h-full mt-6 bg-dark rounded-md drop-shadow-2xl">
                    <h2 className="bg-primary w-full text-4xl text-center text-black py-4 drop-shadow-xl">Our Services</h2>
                    <div className="flex flex-col md:flex-row w-full justify-center items-center">
                        <InfoCard imageSrc={gearImage} header="Web Design" info="We can design a website for you that will look great on any device. We can also help you with SEO and social media." />
                        <InfoCard imageSrc={gearImage} header="Branding" info="We can help you create a brand that will stand out from the competition. We can also help you with logo design and more." />
                        <InfoCard imageSrc={gearImage} header="Social Media" info="We can help you create content for your social media accounts. We can also help you with social media marketing." />
                    </div>
                    {/* <div className='bg-primary w-full text-4xl text-center text-black py-4 drop-shadow-xl'></div> */}
                </div>
           
        </div>
    )
}
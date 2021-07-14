import artinuLogoHeader from "./images/logoHeader.svg"

function Header (){
    return(
    <div className="max-w-screen-lg mx-auto pt-12 ">
    <header className="">
        <img className="mb-8 float-left" src={artinuLogoHeader} alt="Logo" />
        <div className="float-right">
            <a href="https://www.artinu.club" target="_blank">Return to website</a>
        </div>
    </header>
    </div>
    )
}

export default Header
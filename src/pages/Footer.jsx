import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {

    const openInstagram = () => {
        window.open('https://www.instagram.com/colonel_sengol', '_blank')
    }

    const openFacebook = () => {
        window.open('https://www.facebook.com/sengol.raju.9', '_blank')
    }

    const openTwitter = () => {
        window.open('https://twitter.com/SustainableWPT?s=20', '_blank')
    }
    return (
        <>

            <footer className=" justify-center items-center text-white bg-primary-500 bg-no-repeat relative left-0 bottom-0 mt-auto">
                <div className="container mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Company</h2>
                            <ul className="list-none">
                                <li><a href="/aboutUs">About Us</a></li>
                                <li><a href="/">Team</a></li>
                                <li><a href="/">Careers</a></li>
                                <li><a href="/contactUs">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4">Legal</h2>
                            <ul className="list-none">
                                <li><a href="/">Privacy Policy</a></li>
                                <li><a href="/">Terms and Conditions</a></li>
                                <li><a href="/">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4">Invest</h2>
                            <ul className="list-none">
                                <li><a href="/">Features</a></li>
                                <li><a href="/">Investment Opportunities</a></li>
                                <li><a href="/">Investor Relations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                            <ul className="list-none">
                                <li>
                                    <Link to='#' onClick={openFacebook}>
                                        <a>Facebook</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='#' onClick={openTwitter}>
                                        <a>Twitter</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" onClick={openInstagram}>
                                        <a>Instagram</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p>&copy; 2023 AgroEduVaango. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
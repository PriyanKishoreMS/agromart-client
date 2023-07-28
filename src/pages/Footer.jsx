import './Footer.css'

const Footer = () => {
    return (
        <>

            <footer className=" justify-center items-center text-white bg-mybgcolor-500 bg-no-repeat relative left-0 bottom-0 mt-auto">
                <div className="container mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Company</h2>
                            <ul className="list-none">
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Team</a></li>
                                <li><a href="/">Careers</a></li>
                                <li><a href="/">Contact Us</a></li>
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
                                <li><a href="/">Facebook</a></li>
                                <li><a href="/">Twitter</a></li>
                                <li><a href="/">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p>&copy; 2023 Agroவாங்கோ. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
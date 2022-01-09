import Footer from "../footer/Footer"
import Header from "../header/Header"

const ErrorComp = () => {
    return (
        <>
            <Header />
            <main id="main" className="main">
                <p>Failed to load data from server, please try again later.</p>
            </main>
            <Footer />
        </>
    )
}
export default ErrorComp;

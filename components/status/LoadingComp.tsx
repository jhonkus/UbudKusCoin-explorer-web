import Footer from "../footer/Footer"
import Header from "../header/Header"

const LoadingComp = () => {
    return (
        <>
            <Header />
            <main id="main" className="main">
                <p>Please wait loading ...</p>
            </main>
            <Footer />
        </>
    )
}
export default LoadingComp;

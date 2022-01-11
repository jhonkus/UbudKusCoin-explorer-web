import Footer from "../footer/Footer";
import Header from "../header/Header";

const NotFound = () => {
    return (
        <>
            <Header />
            <main id="main" className="main">
            <div className="d-flex justify-content-center">
                <br />
                <p>The data/information you are looking, was not found!</p>
            </div>
            </main>
            <Footer/>
        </>
    )
}
export default NotFound;

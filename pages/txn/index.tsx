import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

export default function NoTxnId() {
    return (
        <>
            <Header />
            <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <p>Please visit this page with transaction ID!</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

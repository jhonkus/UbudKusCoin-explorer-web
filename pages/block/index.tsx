import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

export default function NoTxnId() {
    return (
        <>
            <Header />
            <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <p>Please visit this page with block Height or Block Hash!</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

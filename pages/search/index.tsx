import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Link from 'next/link'

export default function NoTxnId() {
    return (
        <>
            <Header />
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Searh Result</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>

                            <li className="breadcrumb-item">
                                <Link href="#"><a>Search</a></Link>
                            </li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-title" />
                                <div className="card-body">
                                    {/* content here */}
                                                     ini hasil   

                                    {/* content end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>

    )
}

import Layout from '../components/Layout'


export default function NoTxnId() {
    return (
        <Layout pageTitle="No transaction ID">
            <main id="main" className="main">
                <div className="pagetitle">
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-title" />
                                <div className="card-body">
                                    <p className="text-center">There is no data matching with your search keyword!</p>
                                    <p className="text-center">Please use, block height, block hash, transaction hash or address as keyword!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>


    )
}

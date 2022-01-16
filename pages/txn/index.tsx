import Layout from '../../components/Layout'
export default function NoTxnId() {
    return (
        <Layout pageTitle="Transaction ID not found">
            <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <p>Please visit this page with transaction ID!</p>
                </div>
            </main>
        </Layout>
    )
}

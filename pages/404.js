import Layout from '../components/Layout'

export default function Custom404() {
    return (
        <Layout pageTitle="Please visit by block height">
            <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <p>Thank you visiting UKC Scan,<br />
                        but sorry, page you are looking not found.<br />
                        Please visit other page!</p>
                </div>
            </main>
        </Layout>
    )
}
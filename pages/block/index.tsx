import Layout from '../../components/Layout'

export default function NoBlock() {
    return (
        <Layout pageTitle="Restricted block area">
             <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <p>Please visit this page with block Height or Block Hash!</p>
                </div>
            </main>
        </Layout>
    )
}

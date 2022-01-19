import Layout from '../../components/Layout'
import nodes from '../../public/nodes.png'
import Image from 'next/image'
import Link from 'next/link';

export default function Nodes() {
    return (
        <Layout pageTitle="Nodes">
            <main id="main" className="main">

                <div className="pagetitle">
                    <h5>Nodes</h5>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>

                            <li className="breadcrumb-item">
                                <Link href="/nodes"><a>Nodes</a></Link>
                            </li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="card">
                                <div className="card-title" />
                                <div className="card-body text-center">
                                    <p className="text-small">Currently we only have one node for testing purpose only, located at AWS Singapore data center. We will use more nodes for  main network.</p>
                                    <br /><br />
                                    <Image src={nodes} width="1024" height="512" alt="nodes location" />
                                </div></div></div></div>
                </section>
            </main>
        </Layout>

    )
}

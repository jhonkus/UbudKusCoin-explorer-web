import Link from 'next/link'
import Layout from '../components/Layout'

export default function Custom404() {
  return (
    <Layout pageTitle="Page not found">
      <main id="main" className="main">
        <div className="container">
          <div className="row justify-content-center py-5">
            <div className="col-md-8 col-lg-6 text-center">
              <div className="empty-state">
                <div className="display-1 fw-bolder text-primary" style={{ letterSpacing: '-0.05em' }}>
                  404
                </div>
                <h1 className="h4 fw-bold mt-2">Page not found</h1>
                <p>
                  Thank you for visiting UbudKusChain Scan, but the page you&apos;re looking for
                  doesn&apos;t exist or may have been moved.
                </p>
                <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">
                  <Link href="/" className="btn btn-primary px-4">
                    <i className="bi bi-house-door me-2"></i>Back to Home
                  </Link>
                  <Link href="/blocks" className="btn btn-outline-primary px-4">
                    Explore Blocks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

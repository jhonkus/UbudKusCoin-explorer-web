import Layout from "../Layout";

const ErrorComp = () => {
    return (
        <Layout pageTitle="Loading content">
            <div className="d-flex justify-content-center">
                <br />
                <p>Failed to load data from server, please try again later.</p>
            </div>
        </Layout>
    )
}
export default ErrorComp;

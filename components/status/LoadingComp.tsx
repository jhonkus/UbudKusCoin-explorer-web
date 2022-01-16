import Image from "next/image";
import loading from "../../public/loading.gif";
import Layout from "../Layout";

const LoadingComp = () => {
    return (
        <Layout pageTitle="Error Loading content">
            <main id="main" className="main">
                <div className="d-flex justify-content-center">
                    <Image src={loading} width="20" height="20" alt="Please wait loading ..." />
                </div>
            </main>
        </Layout>
    )
}
export default LoadingComp;

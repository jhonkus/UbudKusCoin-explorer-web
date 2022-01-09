import Image from "next/image";
import loading from "../../public/loading.gif";

const LoadingComp = () => {
    return (
        <main id="main" className="main">
            <div className="d-flex justify-content-center">
                <Image src={loading} width="20" height="20" alt="Please wait loading ..." />
            </div>
        </main>
    )
}
export default LoadingComp;

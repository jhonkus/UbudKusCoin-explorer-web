import { useRouter } from "next/router";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function AddressDetail(){

    const router = useRouter()
    const { address } = router.query

    
    return (
        <div className={'container'}>
            <Header />
            <h1>Address Detail {address}</h1>
            <Footer />
        </div>
    )
}
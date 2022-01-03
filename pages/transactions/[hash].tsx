import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useRouter } from 'next/router'

export default function TransactionDetail() {
  const router = useRouter()
  const { hash } = router.query

  return (
        <div className={'container'}>
            <Header />
            <h1>Transaction Detail {hash}</h1>
            <Footer />
        </div>
  )
}

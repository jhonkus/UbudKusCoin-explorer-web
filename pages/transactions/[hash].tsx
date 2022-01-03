import Header from '../../components/Header'
import Footer from '../../components/Footer'
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

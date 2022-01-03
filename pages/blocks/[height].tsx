import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'

export default function BlockDetail() {

  const router = useRouter()
  const { height } = router.query

  return (
        <div className={'container'}>
            <Header />
            <h1>Block Detail of {height}</h1>
            <Footer />
        </div>
  )
}

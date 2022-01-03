import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
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

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './BlockDetail.module.css'
import toDate from '../../utils/util';

type RootState = ReturnType<typeof store.getState>;

export default function BlockDetail() {
  const savedBlocks = useSelector((state: RootState) => state.blocks);
  const router = useRouter()
  const { height } = router.query;
  const [block, setBlock] = useState(Object);

  useEffect(() => {
    const block = savedBlocks?.blocks?.find(({ Height }) => Height === height);
    setBlock(block);
  }, [height, savedBlocks?.blocks]);

  if (!block) {
    return (<div>Please back </div>)
  }
  return (
    <div className="container">
      <Header />
      <div className={styles.title}><h5>Block #{block?.Height}</h5></div>
      <div className="card">

        <div className="card-body">

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Height</div><div className="col"> :  {block.Height}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">TimeStamp</div><div className="col"> :  { toDate(block.TimeStamp)}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3"> PrevHash</div><div className="col"> :  {block.PrevHash}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Hash</div><div className="col"> :  {block.Hash}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Transactions</div><div className="col"> :  {block.transactions?.length} transaction(s) in this block</div>
          </div>


          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Validator</div><div className="col"> :  {block.Validator}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3"> MerkleRoot</div><div className="col"> :  {block.MerkleRoot}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3"> NumOfTx</div><div className="col"> :  {block.NumOfTx}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Difficulty</div><div className="col"> :  {block.Difficulty}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">TotalAmount</div><div className="col"> :  {block.TotalAmount}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3"> TotalReward</div><div className="col"> :  {block.TotalReward}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

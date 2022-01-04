import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
type RootState = ReturnType<typeof store.getState>;

// interface Block {
//     Version: string,
//     Height: string,
//     TimeStamp: string,
//     PrevHash: string,
//     Hash: string,
//     Transactions: string,
//     Validator: string,
//     MerkleRoot: string,
//     NumOfTx: number,
//     TotalAmount: number,
//     TotalReward: number,
//     Difficulty: number
// }

export default function BlockDetail() {
  const savedBlocks = useSelector((state: RootState) => state.blocks);
  const router = useRouter()
  const { height } = router.query;
  const [block, setBlock] = useState(Object);

  useEffect(() => {
    const savedBlock = savedBlocks?.blocks?.find(({ Height }) => Height === height);
    setBlock(savedBlock);
  }, [height, savedBlocks?.blocks]);


  return (
    <div className={'container'}>
      <Header />
      <h1>Block #{block?.Height}</h1>
      <ul className="list-group">
        <li className="list-group-item">
          Height: {block.Height}
        </li>

        <li className="list-group-item">
          TimeStamp: {block.TimeStamp}
        </li>

        <li className="list-group-item">
          PrevHash: {block.PrevHash}
        </li>

        <li className="list-group-item">
          Hash: {block.Hash}
        </li>

        <li className="list-group-item">
          Transactions: {block.transactions?.length} transaction(s) in this block
        </li>


        <li className="list-group-item">
          Validator: {block.Validator}
        </li>

        <li className="list-group-item">
          MerkleRoot: {block.MerkleRoot}
        </li>

        <li className="list-group-item">
          NumOfTx: {block.NumOfTx}
        </li>

        <li className="list-group-item">
          Difficulty: {block.Difficulty}
        </li>

        <li className="list-group-item">
          TotalAmount: {block.TotalAmount}
        </li>

        <li className="list-group-item">
          TotalReward: {block.TotalReward}
        </li>
      </ul>
      <Footer />
    </div>
  )
}

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import store from '../../redux/store';
import { useSelector } from 'react-redux';
type RootState = ReturnType<typeof store.getState>;

export default function BlockDetail() {
  const block = useSelector((state: RootState) => state.block);
  // const router = useRouter()
  // const { height } = router.query


  let txs = [];
  if (block.current.Transactions){
    txs = JSON.parse(block.current.Transactions);
  }
  console.log('txs', txs);


  return (
    <div className={'container'}>
      <Header />
      <h1>Block #{block.current.Height}</h1>
      <ul className="list-group">
        <li className="list-group-item">
          Height: {block.current.Height}
        </li>

        <li className="list-group-item">
          TimeStamp: {block.current.TimeStamp}
        </li>

        <li className="list-group-item">
          PrevHash: {block.current.PrevHash}
        </li>

        <li className="list-group-item">
          Hash: {block.current.Hash}
        </li>

        <li className="list-group-item">
          Transactions: {txs.length} transaction(s) in this block
        </li>

        {/* var transactions = JsonConvert.DeserializeObject<List<TrxModel>>(block.Transactions);
            Console.WriteLine("Transactions:");
            foreach (var trx in transactions)
            {
                Console.WriteLine("   ID          : {0}", trx.Hash);
                Console.WriteLine("   Timestamp   : {0}", Utils.ToDateTime(trx.TimeStamp));
                Console.WriteLine("   Sender      : {0}", trx.Sender);
                Console.WriteLine("   Recipient   : {0}", trx.Recipient);
                Console.WriteLine("   Amount      : {0}", trx.Amount.ToString("N", CultureInfo.InvariantCulture));
                Console.WriteLine("   Fee         : {0}", trx.Fee.ToString("N4", CultureInfo.InvariantCulture));
                Console.WriteLine("   - - - - - - ");

            }
             */}
        <li className="list-group-item">
          Validator: {block.current.Validator}
        </li>

        <li className="list-group-item">
          MerkleRoot: {block.current.MerkleRoot}
        </li>

        <li className="list-group-item">
          NumOfTx: {block.current.NumOfTx}
        </li>

        <li className="list-group-item">
          Difficulty: {block.current.Difficulty}
        </li>

        <li className="list-group-item">
          TotalAmount: {block.current.TotalAmount}
        </li>

        <li className="list-group-item">
          TotalReward: {block.current.TotalReward}
        </li>
      </ul>
      <Footer />
    </div>
  )
}

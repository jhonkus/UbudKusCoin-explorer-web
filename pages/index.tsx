import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import styles from './Home.module.css'
import { useEffect } from 'react'
// import {grpc} from "@improbable-eng/grpc-web";

import { BChainServiceClient } from "../grpc/services/bchain_pb_service";
import { BlockRequest} from '../grpc/services/bchain_pb'

const client = new BChainServiceClient("http://54.254.238.133:5001");


// const host = "http://54.254.238.133:5001";

// function getLastBlock() {
//   const emptyRequest = new EmptyRequest();
//   grpc.unary(BChainService.LastBlock, {
//     request: emptyRequest,
//     host: host,
//     onEnd: res => {
//       const { status, statusMessage, headers, message, trailers } = res;
//       console.log("getBook.onEnd.status", status, statusMessage);
//       console.log("getBook.onEnd.headers", headers);
//       if (status === grpc.Code.OK && message) {
//         console.log("getBook.onEnd.message", message.toObject());
//       }
//       console.log("getBook.onEnd.trailers", trailers);
//       // getFirstBlock();
//     }
//   });
// }



// function getFirstBlock() {
//   const req = new EmptyRequest();

//   const client = grpc.client(BChainService.GenesisBlock, {
//     host: host,
//   });
//   client.onHeaders((headers: grpc.Metadata) => {
//     console.log("queryBooks.onHeaders", headers);
//   });
//   client.onMessage((message: any) => {
//     console.log("queryBooks.onMessage", message.toObject());
//   });
//   client.onEnd((code: grpc.Code, msg: string, trailers: grpc.Metadata) => {
//     console.log("queryBooks.onEnd", code, msg, trailers);
//   });
//   client.start();
//   client.send(req);
// }

// function getLastBlock(){
//   const req = new EmptyRequest();
//   client.lastBlock(req, (err, response) => {
//     /* ... */
//     if (err){
//       console.log(err.message);
//       return;
//     }
    
//     console.log(response?.getBlock()?.getHeight());
    
//   });
  
// }

function getBlocks(){
  const req = new BlockRequest();
  req.setPageNumber(1);
  req.setResultPerPage(20);
  client.getBlocks(req, (err, response) => {
    /* ... */
    if (err){
      console.log(err.message);
      return;
    }
    
    console.log(response?.getBlocksList());
    
  });
  
}

export default function Home() {
  useEffect(() => {
    console.log('--- Letsgo ....');
    getBlocks();
  }, [])

  return (
    <div className={'container'}>
      <Header />
      <main className={'d-flex flex-column min-vh-100'}>
        <Head>
          <title>Ubudkus Coin Explorer</title>
          <meta name='description' content='web app for ubudkuscoin blockchain explorer' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h1 className='display-5 fw-bold'>UKC Blockchain Explorer</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead mb-6'>
              Here you can browse and explore information about ubudkuscoin blockchain: Block, Transaction, Sender, Recipient, Address.
            </p>
          </div>
        </div>

        <div className={'row'}>
          <div className={'col-md-6'}>
            <h5>Latest Blocks</h5>
            <table className={'table-table-striped'}>

              <tbody>
                <tr>
                  <th scope="row">BK</th>
                  <td>13904084</td>
                  <td>Miner: john</td>
                  <td>0.3 Ukc</td>
                </tr>
                <tr>
                  <th scope="row">BK</th>
                  <td>13904084</td>
                  <td>Miner: john</td>
                  <td>0.3 Ukc</td>
                </tr>
                <tr>
                  <th scope="row">BK</th>
                  <td>13904084</td>
                  <td>Miner: john</td>
                  <td>0.3 Ukc</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h5>Latest Transactions</h5>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Tx</th>
                  <td>0x6c0c5881a2e41</td>
                  <td className={styles.address}>From: 0xed21cee70256c54dd5e2c93005fc8745922ceb39
                    <br />
                    To: 0x72f77d8985b6f2c22f6a...</td>
                  <td>8 Ukc</td>
                </tr>
                <tr>
                  <th scope="row">Tx</th>
                  <td>0x6c0c5881a2e41</td>
                  <td className={styles.address}>From: 0xed21cee70256c54dd5e2c93005fc8745922ceb39
                    <br />
                    To: 0x72f77d8985b6f2c22f6a...</td>
                  <td>8 Ukc</td>
                </tr>
                <tr>
                  <th scope="row">Tx</th>
                  <td>0x6c0c5881a2e41</td>
                  <td className={styles.address}>From: 0xed21cee70256c54dd5e2c93005fc8745922ceb39
                    <br />
                    To: 0x72f77d8985b6f2c22f6a...</td>
                  <td>8 Ukc</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

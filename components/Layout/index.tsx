import Header from '../Header';
import Footer from '../Footer';
import { ReactNode } from 'react';
import styles from './Layout.module.css';
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
    pageTitle: string;
}

export default function Layout(props: LayoutProps) {
    const { children, pageTitle } = props;
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Ubudkuscoin is simple, light, fast coin developed in Bali, Indonesia by I Putu Kusuma Negara. UbudKuscoin using Proof of Stake Consesnsus. With UbudKusCoin you can send or transfer coin with other user. UbudKusCoin open to use to other use cases." />
                <meta name="author" content="I Putu Kusuma Negara github account: Jhonkus." />
                <title>UbudKusCoin.com | {pageTitle}</title>
            </Head>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>{children}</div>
                <Footer />
            </div>
        </>
    );
}

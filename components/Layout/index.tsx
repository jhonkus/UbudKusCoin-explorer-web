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
    const fullTitle = pageTitle ? `${pageTitle} | UbudKusChain Explorer` : 'UbudKusChain Explorer';
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="UbudKusChain Explorer is the official blockchain explorer for viewing blocks, transactions, addresses, and network activity on the UbudKusChain network." />
                <meta name="author" content="I Putu Kusuma Negara github account: Jhonkus." />
                <meta name="theme-color" content="#0f62fe" />
                <title>{fullTitle}</title>
            </Head>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>{children}</div>
                <Footer />
            </div>
        </>
    );
}

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
                <meta name="description" content="Ubudkuscoin is light coin form Bali, Indonesia, developed by Putu Kusuma" />
                <meta name="author" content="pKusuma aka Jhonkus" />
                <title>UbudKusCoin | {pageTitle}</title>
                {/* <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
                <link rel="shortcut icon" href="/static/favicon.ico" /> */}
            </Head>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>{children}</div>
                <Footer />
            </div>
        </>
    );
}

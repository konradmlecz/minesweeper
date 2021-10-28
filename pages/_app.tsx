import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Head from 'next/head';
import {appWithTranslation, useTranslation} from 'next-i18next';

function MyApp({Component, pageProps}: AppProps) {
    const {t} = useTranslation('common');
    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta
                    name="description"
                    content={t('description')}/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default appWithTranslation(MyApp)

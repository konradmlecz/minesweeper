import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import Head from 'next/head';
import nextI18NextConfig from '../next-i18next.config'
import {appWithTranslation, useTranslation} from 'next-i18next';
import {GameProvider} from "store/contextGame";

function MyApp({Component, pageProps}: AppProps) {
    const {t} = useTranslation('common');
    return (
        <>
            <Head>
                <title>{t('head.title')}</title>
                <meta
                    name="description"
                    content={t('head.description')}/>
            </Head>
            <GameProvider>
            <Component {...pageProps} />
            </GameProvider>
        </>
    )
}

export default appWithTranslation(MyApp,nextI18NextConfig)

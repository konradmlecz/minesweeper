import React from "react"
import { useTranslation } from 'next-i18next'
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

function TopNavigation() {
    const {t} = useTranslation('baseLayout');
    return (
        <div className="bg-white ">
            <nav className=" container max-w-screen-lg  p-2 flex">
                <div className="flex-grow hover:text-blue-500 leading-6 transition duration-500 ease-in-out">
                    <Link href={"/"}>
                        {t('nav.title')}
                    </Link>
                </div>
                <div
                    className={'rounded-xl pr-2 pl-2 text-white hover:text-blue-500 bg-blue-500 hover:bg-white leading-6 transition duration-500 ease-in-out'}>
                    <Link href={"/"}>
                        {t('nav.button.game')}
                    </Link>
                </div>
                <div className="pr-4 pl-4 hover:text-blue-500 leading-6 transition duration-500 ease-in-out">
                    <Link href={"/"}>
                        {t('nav.button.about')}
                    </Link>
                </div>
                <div className="hover:text-blue-500 leading-6 transition duration-500 ease-in-out">
                    <Link href={"/"}>
                        {t('nav.button.contact')}
                    </Link>
                </div>
            </nav>
        </div>


    )
}

function Footer() {
    const {t} = useTranslation('baseLayout');
    return (
        <div className="container max-w-screen-lg  p-5">
            <p className="text-center">{t('footer.title')}</p>
        </div>
    )
}


export default function BaseLayout({children}: LayoutProps) {
    return (
        <>
            <div className="min-h-screen flex flex-col text-xs sm:text-base">
                <TopNavigation/>
                {children}
                <Footer/>
            </div>
        </>
    );
}
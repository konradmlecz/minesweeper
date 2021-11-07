import type {NextPage} from 'next'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ReactSVG} from 'react-svg'
import BaseLayout from "components/BaseLayout";

export const getStaticProps = async ({locale}: { locale: string }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'home', 'baseLayout']),
    },
})

const Home: NextPage = () => {
    const {t} = useTranslation('home');
    return (
        <BaseLayout>
            <main className={" self-center flex flex-col items-center justify-center flex-1 max-w-screen-lg h-full "}>
                <div
                    className={"relative flex flex-col justify-center items-start bg-white rounded-2xl shadow-md m-2 sm:m-0"}>
                    <div
                        className={"absolute w-full h-full bg-blue-500 rounded-3xl z-minus  transform sm:rotate-3 sm:scale-110 shadow-md"}></div>
                    <h1 className={'p-2 sm:p-4 text-lg sm:text-2xl '}> {t('main.title')}</h1>
                    <p className={'pt-2 pl-2 pr-2 sm:pt-4 sm:pl-4 sm:pr-4 pb-2 sm:text-base'}>{t('main.description')}</p>
                    <button
                        className=" self-center text-base sm:text-xl text-white m-4 px-4 py-2 bg-red-500 border-b-2 rounded-full hover:text-red-500 hover:bg-white transition duration-500 ease-in-out">{t('main.button.play')}</button>
                </div>
                <div className={'self-end pt-6,'}>
                    <ReactSVG src="./images/bomb-154456.svg" beforeInjection={(svg) => {
                        svg.classList.add('sm:w-100')
                        svg.classList.add('w-80')
                    }}/>
                </div>
            </main>
        </BaseLayout>
    )
}

export default Home

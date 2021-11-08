import type {NextPage} from 'next'
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import BaseLayout from "components/BaseLayout";


export const getStaticProps = async ({locale}: { locale: string }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'contact', 'baseLayout']),
    },
})

const About: NextPage = () => {
    const {t} = useTranslation('contact');
    return (
        <BaseLayout>
            <main className={" self-center flex flex-col items-center justify-center flex-1 max-w-screen-lg h-full "}>
                <div className={"w-80/100"}>
                    <p>{t('description.info')}</p>
                </div>
            </main>
        </BaseLayout>
    )
}

export default About

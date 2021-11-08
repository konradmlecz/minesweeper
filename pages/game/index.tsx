import type {NextPage} from 'next'
import React, {useContext} from "react";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import BaseLayout from 'components/BaseLayout';
import {ContextGame} from "store/contextGame";
import {setState} from "services/setState";
import {Field} from "components/Field";
import {ACTIONS} from "data/constant";

export const getStaticProps = async ({locale}: { locale: string }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'game', 'baseLayout']),
    },
})
const Game: NextPage = () => {
    const {t} = useTranslation('game');
    const {state: {numberOfNotDisplayedFields, isLost, isWin, fields}, dispatch} = useContext(ContextGame)
    const handleClickStartGameBtn = () => {
        dispatch({type: ACTIONS.START, payload: {...setState()}})
    }
    return (
        <BaseLayout>
            <main className={" self-center flex flex-col items-center justify-center flex-1 max-w-screen-lg h-full "}>
                <div className={"m-4 text-base sm:text-xl "}>
                    {(!(isWin || isLost)) &&
                    <p>{t("info.command1", {numberOfNotDisplayedFields: numberOfNotDisplayedFields})}</p>}
                    {isLost && <p>{t("info.command2")}</p>}
                    {isWin && <p>{t("info.command3")}</p>}
                </div>
                <div className={" sm:w-500 sm:h-500 w-300 h-300 flex flex-wrap bg-red-100"}>
                    {fields.map((field, i) => {
                        return (
                            <Field key={i} id={field.getId()} bomb={field.getBomb()}
                                   isDisplayed={field.getIsDisplayed()}
                                   explosion={field.getExplosion()}
                                   numberOfNeighborBomb={field.getNumberOfNeighborBomb()}/>
                        )
                    })}
                </div>
                <div className={"m-4"}>
                    <button
                        className="rounded-xl pr-2 pl-2 text-white hover:text-red-500 bg-red-500 hover:bg-white leading-6 transition duration-500 ease-in-out"
                        onClick={handleClickStartGameBtn}>{t("control.button")}</button>
                </div>
            </main>
        </BaseLayout>
    )
}

export default Game

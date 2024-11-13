import React, { useCallback, useEffect, useState } from 'react';
import { getAllScores, getScoreById, postScores } from '../utils/getAllScores';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';


const ScoresContext = React.createContext<any>({});

export const ScoreContextProvider = ({ children }: any) => {

    const [score, setScore] = useState<any>();
    const navigate = useNavigate();
    const [scoreLoading, setScoreLoading] = useState<any>(true);
    const params = useParams<{ id: string }>();
    const eventId = params.id;
    useEffect(() => {
        if (eventId) {
            const fetchEventScore = async () => {

                await getScoreById(setScore, setScoreLoading, eventId);
            }
            fetchEventScore();
        } else {

            const fetchScores = async () => {
                await getAllScores(setScore, setScoreLoading, navigate);
            }
            fetchScores();
        }

    }, [eventId, scoreLoading]);

    const handleScore = useCallback((score: any) => {
        postScores(score, t('UPDATE_SCORE'));
    }, [score, scoreLoading]);

  

    const value = { handleScore, score, scoreLoading }

    return <ScoresContext.Provider value={value}> {children}</ScoresContext.Provider>
}

export const useScoreContext = () => React.useContext(ScoresContext);


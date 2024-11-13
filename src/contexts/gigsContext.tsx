import React, { useCallback, useEffect, useState } from "react";
import { fetchGig, fetchGigsById, fetchTeacherReservedGig, fetchUserReservedGig, reserveGig } from "../utils/fetchGigs";
import { useTeacherContext } from "./teachersContext";
import { useParams } from "react-router-dom";

const TeacherGigsContext = React.createContext<any>({});

export const TeacherGigsProvider = ({ children }: any) => {
  const params = useParams<{ id?: string }>();
  const gigparams = useParams<{ gigId?: string }>();

  const teacherId = params.id;
  const gigId = gigparams.gigId;

  const [TeacherId, setTeacherId] = useState<any>(null);
  const [gigs, setGigs] = useState<any[]>([]);
  const [gig, setGig] = useState<any>('');
  const [reserveGigs, setReserveGigs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(null);

  useEffect(() => {
    fetchUserReservedGig(setReserveGigs)
    fetchGigsById(setGigs, teacherId)
    if (TeacherId !== null && TeacherId !== undefined) {

      fetchGigsById(setGigs, TeacherId)

    }
    if (gigId) {

      fetchGig(setGig, gigId);
    }

  }, [TeacherId, teacherId, gigId, isLoading]);

  const handleTeacherId = useCallback(
    (value: any) => {
      return setTeacherId(value);
    },
    [TeacherId]
  );
  const value = { gig, gigs,reserveGigs, isLoading, setIsLoading, handleTeacherId }

  console.log(gigs, 'cd')
  return <TeacherGigsContext.Provider value={value}> {children}</TeacherGigsContext.Provider>
}

export const gigsContextStore = () => React.useContext(TeacherGigsContext);

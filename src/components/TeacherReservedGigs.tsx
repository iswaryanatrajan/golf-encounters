import React from 'react';
import { useTeacherContext } from '../contexts/teachersContext';

const ReservationDetails = () => {
  const { teacherReserved ,isLoading} = useTeacherContext();

  return (

   
        isLoading ? "loading..." :  <div className="overflow-x-auto max-w-7xl mx-auto">
        {teacherReserved.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            You don't have any reservations.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nickname</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gig Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red">
              {teacherReserved.map((item: any) => (
                <tr key={item.id} className='shadow-lg bg-white hover:bg-[#f2f2f2] cursor-pointer'>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 border-2 border-solid border-[#17b3a6] rounded-full">
                        <img className="h-10 w-10 rounded-full" src={item?.userReservations?.imageUrl || ""} alt={item?.userReservations?.nickName} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item?.userReservations?.nickName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-500 mt-2">{item?.gigReservations?.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.gigReservations?.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-200 text-[#17b3a6] px-2 py-1 rounded-lg">{item?.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
 
   
  );
}

export default ReservationDetails;

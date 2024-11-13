export interface TeacherDetailsProp {
  count?: number;
  teachers?: [];
  aboutMyself?: string;
  createdAt?: string | string[];
  imageUrl?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  schedules?: SchedulesTabsProps[];
  updatedAt: string;
  userId: string;
  hourlyRate?:string;
  timeSlots?: string[];
  
}

// Define the 'shifts' interface
export interface Shifts {
  scheduleId: number;
  bookedBy: null | string;
  day: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  isBooked: any;
}

// Define the 'SchedulesTabsProps' interface
export interface SchedulesTabsProps {
  createdAt: string;
  endDate: string;
  id: number;
  shifts: Shifts[]; // Use the 'Shifts' interface here
  startDate: string;
  teacherId: number;
  updatedAt: string;
  date: string; 
}
export type Post = {
  id: string;
  imageUrl: string;
  text: string;
  tags: string[];
  commentsCount: number;
  likesCount: number;
};


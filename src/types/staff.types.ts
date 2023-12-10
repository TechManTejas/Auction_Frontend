export type StaffRole = 'SUPERADMIN' | 'AUCTIONADMIN' | 'TENDERADMIN';

export interface IStaff extends Document {
    _id: string;
    username: string;
    password: string;
    role: StaffRole; 
}
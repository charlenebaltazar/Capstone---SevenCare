export interface IAppointment {
  _id: string;
  patientId: number;
  medicalDepartment: string[];
  schedule: Date;
  email: string;
  phoneNumber: string;
  status: string;
  isPaid: boolean;
  createdAt: Date;
  isDeleted: boolean;
}

export interface IUser {
  _id: string;
  firstname: string;
  surname: string;
  gender: string;
  birthDate: string;
  address: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
}

export interface INotifications {
  _id: string;
  text: string;
  createdAt: Date;
  seen: boolean;
}

export interface ITransactions {
  _id: string;
  appointmentId: string;
  amount: number;
  modeOfPayment: string;
  status: string;
  createdAt: Date;
}

export interface IMedicalRecord {
  _id: string;
  appointmentId: string;
  status: string;
  diagnosis: string;
  createdAt: Date;
}
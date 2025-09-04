export interface IAppointment {
  _id: number;
  patientId: number;
  medicalDepartment:
    | "Consultation"
    | "Vaccination"
    | "Medical Certificate"
    | "Laboratory"
    | "Holistic Care"
    | "Circumcision/TULI"
    | "Medical Check Up"
    | "Prenatal Check Up"
    | "Family Planning";
  schedule: Date;
  email: string;
  phoneNumber: string;
  status: string;
  isPaid: boolean;
  createdAt: Date;
  isDeleted: boolean;
}

export interface IUser {
  _id: number;
  firstname: string;
  surname: string;
  gender: string;
  birthDate: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

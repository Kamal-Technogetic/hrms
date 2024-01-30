import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

interface Attendance {
  timeIn: Date;
  timeOut: Date;
  shift: String;
  shiftDuration: Number;
  shiftStartTime: String;
  shiftEndTime: String;
  present: Boolean;
}

interface Leave {
  leaveId: String;
  leaveApproval: String;
  shortLeave: String;
  reasonForLeave: String;
  totalLeaveBalance: String;
  sickLeaveBalance: String;
  otherLeaveBalance: String;
  personalLeaveBalance: String;
  status: String; // Status of the leave (e.g., approved, pending, rejected)
}

interface SalaryHistory {
  date: Date;
  salary: {
    basic: Number;
    housingAllowances: Number;
    travelAllowances: Number;
    bonus: Number;
    taxDeduction: Number;
    deduction: Number;
  };
}

interface documentHistory {
  highSchoolClgName: String;
  highSchoolboard: String;
  highSchoolpercentage: String;
  highSchoolCertificate: Buffer;

  intermediateClgName: String;
  intermediateboard: String;
  intermediatepercentage: String;
  intermediateCertificate: Buffer;

  bachlorsClgName: String;
  bachlorsboard: String;
  bachlorspercentage: String;
  bachlorsCertificate: Buffer;

  mastersClgName: String;
  mastersboard: String;
  masterspercentage: String;
  mastersCertificate: Buffer;

  certificationClgName: String;
  certificationboard: String;
  certificationpercentage: String;
  certificationCertificate: Buffer;

  passportNumber: String;
  dlNumber: String;
  aadharNumber: String;
}

interface EmployeeBasicDetails extends Document {
  _id: String;
  name: String;
  email: String;
  dateOfBirth: String;
  dateOfJoining: String;
  Location: String;
  password: String;
  contactNumber: String;
  jobTitle: String;
  department: String;
  performanceRatings: Number;
  nationality: String;
  gender: String;
  religion: String;
  photo: String;
  fatherName: String;
  emergencyNumber: String;
  relationWithEmergencyNumber: String;

  attendance: Attendance[];

  leaves: Leave[];

  salary: SalaryHistory[];

  workStatus: String; // Status of work location (e.g., in office, remote)

  documents: documentHistory[];
}

const employeeBasicDetailsSchema = new Schema<EmployeeBasicDetails>({
  _id: {
    type: String,
    default: () => {
      return generateEmployeeId();
    },
  },
  name: String,
  email: String,
  dateOfBirth: String,
  dateOfJoining: String,
  Location: String,
  password: String,
  contactNumber: String,
  jobTitle: String,
  department: String,
  performanceRatings: Number,
  nationality: String,
  gender: String,
  religion: String,
  photo: String,
  fatherName: String,
  emergencyNumber: String,
  relationWithEmergencyNumber: String,

  attendance: [
    {
      timeIn: {
        type: Date,
        default: () => moment().toDate(),
      },
      timeOut: {
        type: Date,
        default: () => moment().toDate(),
      },
      shift: String,
      shiftDuration: Number,
      shiftStartTime: String,
      shiftEndTime: String,
      present: Boolean,
    },
  ],

  leaves: [
    {
      leaveId: String,
      leaveApprovel: String,
      shortLeave: String,
      reasonForLeave: String,
      totalLeaveBalance: String,
      sickLeaveBalance: String,
      personalLeaveBalance: String,
      otherLeaveBalance: String,
      status: String, // Status of the leave (e.g., approved, pending, rejected)
    },
  ],

  salary: [
    {
      bankAccountNumber: String,
      ifscCode: String,
      basicSalary: Number,
      housingAllowances: Number,
      travelAllowances: Number,
      bonus: Number,
      taxDeduction: Number,
      deduction: Number,
    },
  ],
  workStatus: String, // Status of work location (e.g., in office, remote)

  documents: [
    {
      highSchoolClgName: String,
      highSchoolboard: String,
      highSchoolpercentage: String,
      highSchoolCertificate: Buffer,

      intermediateClgName: String,
      intermediateboard: String,
      intermediatepercentage: String,
      intermediateCertificate: Buffer,

      bachlorsClgName: String,
      bachlorsboard: String,
      bachlorspercentage: String,
      bachlorsCertificate: Buffer,

      mastersClgName: String,
      mastersboard: String,
      masterspercentage: String,
      mastersCertificate: Buffer,

      certificationClgName: String,
      certificationboard: String,
      certificationpercentage: String,
      certificationCertificate: Buffer,

      passportNumber: String,
      dlNumber: String,
      aadharNumber: String,
    },
  ],
});

function generateEmployeeId() {
  const uuid = uuidv4();
  const timestampPart = uuid.slice(0, 8);
  return `TG${moment().format("YYMMDD")}${timestampPart}`;
}

export default model<EmployeeBasicDetails>(
  "EmployeeDetails",
  employeeBasicDetailsSchema
);

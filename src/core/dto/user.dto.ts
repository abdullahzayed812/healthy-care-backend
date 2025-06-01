import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { User } from "../entities/User";

export interface GetAllUsersResponse {
  doctors: Doctor[];
  patients: Patient[];
  admin: User[];
}

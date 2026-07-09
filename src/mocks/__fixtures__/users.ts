import { User } from "../../types/userTypes"

export const AdminUser: User = {
  groups: ['admin'],
  isAdmin: true
};

export const RegularUser: User = {
  groups: [],
  isAdmin: false
};
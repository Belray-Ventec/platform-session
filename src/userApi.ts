import axios from "axios";

export interface User {
  id: string;
  name: string;
  lastname: string;
  rut: string;
  job: string;
  email: string;
  phone: string;
  libraryConfigId: string;
  planningConfigId: string;
  platformConfigHomeId: string;
  dashboardConfigId: string;
  datareportConfigId: string;
  stocksConfigId: string;
  tribolabConfigId: string;
  avatar: any;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  planningConfig: PlanningConfig;
  homeConfig: HomeConfig;
  dashboardConfig: DashboardConfig;
  datareportConfig: DatareportConfig;
  libraryConfig: LibraryConfig;
  stocksConfig: StocksConfig;
  tribolabConfig: TribolabConfig;
  adminConfig: AdminConfig;
  zones: Zone[];
}

export interface PlanningConfig {
  id: string;
  authorization: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Role {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomeConfig {
  id: string;
  roleId: string;
  authorization: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role2;
}

export interface Role2 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardConfig {
  id: string;
  authorization: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: Role3;
}

export interface Role3 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatareportConfig {
  id: string;
  authorization: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: Role4;
}

export interface Role4 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryConfig {
  id: string;
  authorization: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: Role5;
}

export interface Role5 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StocksConfig {
  id: string;
  roleId: string;
  authorization: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role6;
}

export interface Role6 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TribolabConfig {
  id: string;
  roleId: string;
  authorization: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role7;
}

export interface Role7 {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminConfig {
  id: string;
  roleId: string;
  authorization: boolean;
  createdAt: string;
  updatedAt: string;
  role: AdminRoles;
}

export interface AdminRoles {
  id: string;
  label: string;
  platformId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  sectorLevels: string[];
  equipmentInstanceLevels: string[];
  scheduledWeekendActivity: boolean;
  scheduledActWaivableHolydays: boolean;
  scheduledActInalienableHolydays: boolean;
  validateSchedActByNfc: boolean;
  useEquipmentCodes: boolean;
  enabled: boolean;
  typeId: string;
  createdAt: string;
  updatedAt: string;
  RelUserZones: RelUserZones;
  technicalObservationInputs?: TechnicalObservationInputs[];
}

export interface RelUserZones {
  createdAt: string;
  updatedAt: string;
  zoneId: string;
  userId: string;
}

export interface TechnicalObservationInputs {
  id: string;
  label: string;
  options: string[];
  typeId: string;
  type: {
    id: string;
    label: string;
  };
  relZoneTechnicalObservationInput?: {
    isRequired: boolean;
    order: number;
  };
}

const URL = "https://geslub-service-2licfeyhca-tl.a.run.app";

const getByToken = async (
  token: string,
  baseUrl?: string,
): Promise<User> => {
  const res = await axios.get(`${baseUrl || URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const UserApi = {
  getByToken,
};

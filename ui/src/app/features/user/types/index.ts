import { UserIncident } from "../features/incidents/types";
import { UserContact } from "../features/profile/types";

export type UserState = {
    id: string | undefined;
    version: number | undefined;
    contact: UserContact | undefined;
    userIncidents: UserIncident[]
};


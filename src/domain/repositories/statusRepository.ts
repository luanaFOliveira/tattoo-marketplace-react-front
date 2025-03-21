import { Status } from "@/domain/entities/status";


export interface StatusRepository {
    getAllStatus(): Promise<Status[]>;
}
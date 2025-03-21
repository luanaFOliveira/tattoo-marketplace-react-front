import { Status} from "@/domain/entities/status";
import { StatusRepository } from "@/domain/repositories/statusRepository";

export class StatusApi implements StatusRepository {

    async getAllStatus(): Promise<Status[]> {
        const response = await fetch(`http://localhost:8089/status`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        return data.map((status: any) => this.mapToStatus(status));
    }

    private mapToStatus(data: any): Status {
        return {
          id: data.id,
          name: data.name,
        };
    }


}

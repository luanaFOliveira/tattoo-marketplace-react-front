import { Status} from "@/domain/entities/status";
import { StatusRepository } from "@/domain/repositories/statusRepository";

export class StatusApi implements StatusRepository {

    async getAllStatus(): Promise<Status[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/status`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data: Status[] = await response.json();

        return data.map((status: Status) => this.mapToStatus(status));
    }

    private mapToStatus(data: Status): Status {
        return {
          id: data.id,
          name: data.name,
        };
    }


}

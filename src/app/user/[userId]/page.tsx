import UserView from "@/presentation/pages/UserView";

export default async function UserDetail({
    params,
}:{
    params: Promise<{userId: string}>
}){
    const userId = (await params).userId;
    return <UserView userId={userId} />;
}
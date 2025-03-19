import Topbar from "@/components/shared/top-bar";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/users-list";

type Props = {};

export default function Chat({}: Props) {
  const { user } = useUser();
  const { selectedUser, fetchUsers, fetchMessages } = useChatStore();
  useEffect(() => {
    if (!user) return;
    const fetchValue = async () => {
      await fetchUsers();
    };
    fetchValue();
  }, [fetchUsers, user]);

  useEffect(() => {
    const fetchValue = async () => {
      if (selectedUser) {
        await fetchMessages(selectedUser.clerkId);
      }
    };
    fetchValue();
  }, [selectedUser, fetchMessages]);
  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <div className="grid h-[calc(100vh-180px)] grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr]">
        <UsersList />
      </div>
    </main>
  );
}

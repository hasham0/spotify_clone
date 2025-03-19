import Topbar from "@/components/shared/top-bar";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/users-list";
import NoConversationPlaceholder from "./components/no-conversation-placeholder";
import ChatHeader from "./components/chat-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatMessageTime } from "@/lib/services";
import MessageInput from "./components/message-input";

type Props = {};

export default function Chat({}: Props) {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
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
        <div className="flex h-full flex-col">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"} `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="mt-1 block text-xs text-zinc-300">
                          {formatMessageTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
}

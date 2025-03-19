type Props = {};

const NoConversationPlaceholder = ({}: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <img
        src="/spotify.png"
        alt="Spotify"
        className="size-16 animate-bounce"
      />
      <div className="text-center">
        <h3 className="mb-1 text-lg font-medium text-zinc-300">
          No conversation selected
        </h3>
        <p className="text-sm text-zinc-500">
          Choose a friend to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;

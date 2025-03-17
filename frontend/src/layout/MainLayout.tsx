import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/left-side-bar";
import FriendsAcitivity from "./components/friends-activity";
import AudioPlayer from "./components/audio-player";
import PlayBackControls from "./components/play-back-controls";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col bg-black text-white">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-full flex-1 overflow-hidden p-2"
        >
          <AudioPlayer />
          {/* <!-- left size --> */}
          <ResizablePanel
            defaultSize={20}
            minSize={isMobile ? 0 : 20}
            maxSize={30}
          >
            <LeftSideBar />
          </ResizablePanel>
          <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

          {/* <!-- main content --> */}
          <ResizablePanel defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <>
              <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />
              {/* <!-- right size --> */}
              <ResizablePanel
                defaultSize={20}
                minSize={0}
                maxSize={25}
                collapsedSize={0}
              >
                <FriendsAcitivity />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
        <PlayBackControls />
      </div>
    </>
  );
}

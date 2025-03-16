import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/left-side-bar";
import FriendsAcitivity from "./components/friends-activity";

export default function MainLayout() {
  const isMObile = false;
  return (
    <>
      <div className="flex h-screen flex-col bg-black text-white">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-full flex-1 overflow-hidden p-2"
        >
          {/* <!-- left size --> */}
          <ResizablePanel
            defaultSize={20}
            minSize={isMObile ? 0 : 20}
            maxSize={30}
          >
            <LeftSideBar />
          </ResizablePanel>
          <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

          {/* <!-- main content --> */}
          <ResizablePanel defaultSize={isMObile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>
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
        </ResizablePanelGroup>
      </div>
    </>
  );
}

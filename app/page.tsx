'use client';
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useJDResumeStore } from "@/stores/useJDResumeStore";
import { Loader } from "@/components/loader";
import { NavBar } from "@/components/navBar";
import { JdResumeInput } from "@/components/jdResumeInput";
import { MainView } from "@/components/views";
import { Tools } from "@/components/toolsBar";
import { MessageView } from "@/components/messageView";
export default function Home() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { jdText, resumeText } = useJDResumeStore();
  return (
    <div className="max-w-2xl mx-auto p-4">      
      {isLoading && <Loader />}
      <NavBar />
      { (!jdText || !resumeText) && <JdResumeInput /> }
      <MainView/>
      <Tools/>
      <MessageView/>
    </div>
  );
}
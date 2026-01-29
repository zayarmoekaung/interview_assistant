'use client';
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useKnowledgeBaseStore } from "@/stores/useKnowledgeBaseStore";
import { Loader } from "@/components/loader";
import { NavBar } from "@/components/navBar";
import { KnowledgeBaseInput } from "@/components/knowledgeBaseInput";
import { MainView } from "@/components/views";
import { Tools } from "@/components/toolsBar";
import { MessageView } from "@/components/messageView";
export default function Home() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { jdText, resumeText } = useKnowledgeBaseStore();
  return (
    <div className="max-w-2xl mx-auto p-4">      
      {isLoading && <Loader />}
      <NavBar />
      { (!jdText || !resumeText) && <KnowledgeBaseInput /> }
      <MainView/>
      <Tools/>
      <MessageView/>
    </div>
  );
}
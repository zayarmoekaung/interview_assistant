import { Spinner } from "@chakra-ui/react";
export const Loader = () => {
  return (
    <div className="flex items-center justify-center z-500 opacity-75 backdrop-blur-sm backdrop-brightness-75 fixed top-0 left-0 w-full h-full background-white/50">
      <Spinner size="lg" />
    </div>
  );
};
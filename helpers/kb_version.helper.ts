import { useVersionStore } from "@/stores/useVersionStore";

export function isUptodate(version: number):boolean{
    const { kb_version } = useVersionStore.getState()
    return version === kb_version;
}
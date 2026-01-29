'use client'
import { initSubscribers } from "@/subscribers";
import { useEffect } from "react";

export function InitSubscribers() {
  useEffect(() => {
    initSubscribers();
  }, []);  

  return null;  
}
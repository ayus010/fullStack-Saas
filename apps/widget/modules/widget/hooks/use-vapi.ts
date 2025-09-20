import Vapi from "@vapi-ai/web";
import { error } from "console";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        //Only for testing the Vapi API, otherwise customers will provide their own API keys
        const vapiInstance = new Vapi("acd2d94e-4c8f-4c00-8c58-f33005447cb6");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if(message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role:message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ])
            }
        });

        return () => {
            vapiInstance?.stop();
        }
    }, []);

    const startCall = () => {
        setIsConnecting(true);

        if(vapi) {
            vapi.start("6ebaf78b-e6be-42d2-b9e8-deeec56c15f5");
        }
    }

    const endCall = () => {
        if(vapi) {
            vapi.stop();
        }
    };

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
};
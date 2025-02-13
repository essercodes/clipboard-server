import React, {useState, useEffect, useRef} from "react";
import {flushSync} from "react-dom";

const WebServerApp = () => {
  const [logs, setLogs] = useState([]);
  const logContainerRef = useRef(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();

    flushSync(() => {
      setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
    });

    // scroll to bottom
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    window.electronAPI.onCopyValue((value) => addLog(value));
  }, []);

  return (
    <div className="size-full max-w-md mx-auto flex flex-col h-screen py-8">
      <h1 className={'text-center text-3xl'}>Clipboard Server</h1>
        <div className="space-y-2 min-h-0 grow flex flex-col">
          <h3 className="text-sm font-medium">Recent Logs:</h3>
          <div
              ref={logContainerRef}
              className="bg-gray-50 rounded-md min-h-0 p-2 space-y-1 overflow-y-auto grow">
            {logs.map((log, index) => (
              <div key={index} className="text-sm font-mono text-gray-600">
                {log}
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-sm text-gray-400 italic">No logs yet</div>
            )}
          </div>
      </div>
      <div className={"self-end text-sm text-gray-600"}>http://localhost:3000?copy=%CallerNumber%</div>
    </div>
  );
};

export default WebServerApp;

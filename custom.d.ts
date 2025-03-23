

/// <reference lib="webworker" />

declare const URL: {
    new (url: string | URL, base?: string | URL): URL;
    prototype: URL;
    createObjectURL(obj: Blob | MediaSource): string;
    revokeObjectURL(url: string): void;
    
  };
  
  declare const self: ServiceWorkerGlobalScope & typeof globalThis;
 
  
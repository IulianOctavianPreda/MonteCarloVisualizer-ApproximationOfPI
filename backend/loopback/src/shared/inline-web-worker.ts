import { Worker } from "worker_threads";

export class InlineWorker<T> {
  public worker: Worker;
  constructor(func: (...args: any) => void) {
    // const blob = new Blob(['self.onmessage = ', func.toString()], {type: 'text/javascript'});
    // const url = URL.createObjectURL(blob);

    this.worker = new Worker(`self.onmessage = ${func.toString()}`);
  }

  public run(data: object): Promise<MessageEvent<T>> {
    this.worker.postMessage(data);
    const promise = new Promise<MessageEvent<T>>((resolve, reject) => {
      this.worker.onmessage = resolve;
      this.worker.onerror = reject;
    });

    return promise;
  }
}

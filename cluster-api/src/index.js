import os from "os";
import cluster from "cluster";

function runPrimaryProcess() {
  // const processesCount = os.cpus().length * 2;
  // é foda ser mobile skskk
  const processesCount = 4;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking Server with ${processesCount} processes \n`);

  for (let index = 0; index < processesCount; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} died... sheduling another one!`
      );
      cluster.fork();
    }
  });
}

async function runWorkerProcess() {
  await import("./server.js");
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();

import http from "http";
const processId = process.pid;

const server = http.createServer((request, response) => {
  for (let index = 0; index < 1e7; index++);
  response.end(`handled by pid: ${processId}`);
});

server.listen(3000).once("listening", () => {
  console.log("Server startted in process", processId);
});

// aguardar as conexões encerrarem para só então encerrar o progama
process.on("SIGTERM", () => {
  console.log("Server ending", new Date().toISOString());
  server.close(() => process.exit());
});

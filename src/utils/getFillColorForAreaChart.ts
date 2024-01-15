export default function getFillColorForAreaChart(server: string) {
  switch (server) {
    case "server1":
      return ["#ffd9d9", "#ffb3b3"];
    case "server2":
      return ["#ffecd9", "#ffd9b3"];
    case "server3":
      return ["#d9ffd9", "#b3ffb3"];
    case "server4":
      return ["#d9ecff", "#b3d9ff"];
    case "server5":
      return ["#ffc8cf", "#ffc8cf"];
    case "server6":
      return ["#ffd9d9", "#ffb3b3"];
    default:
      return ["#d9ffd9", "#80ff80"];
  }
}

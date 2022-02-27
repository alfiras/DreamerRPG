import handlePeer from "./util/handlePeer";
import BetterLog from "./util/BetterLog";

BetterLog("DreamerRPG start ...");
const peerObject = handlePeer({
  host: "localhost", // Peer Server Host - default localhost
  port: 9000, // default 9000
  path: "/", // default '/'
});

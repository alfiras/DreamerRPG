import Peer from "peerjs";
import BetterLog from "./BetterLog";
import handleKeyboard from "./handleKeyboard";
import Knight from "./Knight";

const knightsList = {};
const addKnightToGame = (
  id,
  initialPosition = { x: 6, y: 5 },
  handle = true
) => {
  if (!knightsList[id]) {
    const addKnight = Knight();

    addKnight.state.add("set_knight_position", function () {
      addKnight.x = addKnight.state.get().x * 64;
      addKnight.y = addKnight.state.get().y * 64;
    });
    addKnight.state.set({ x: initialPosition.x, y: initialPosition.y });
    addKnight.x = addKnight.state.get().x * 64;
    addKnight.y = addKnight.state.get().y * 64;

    if (handle) {
      handleKeyboard(addKnight.state);
    }

    knightsList[id] = addKnight;
  }
};

const handlePeer = ({ host, port, path }) => {
  // Peer
  const peerContainer = document.querySelector("div#peer");
  const peerId = document.querySelector("span#peer-id");
  const peerStatus = document.querySelector("span#peer-status");
  const listStatusMsg = document.querySelector("div#list-status-msg");

  // Add Peer
  const formIdTujuan = document.querySelector("form#form-id-tujuan");
  const inputIdTujuan = document.querySelector("input[name='id-tujuan']");

  // Chat
  const chatContainer = document.querySelector("div#chat");
  const formChat = document.querySelector("form#form-chat");
  const inputIsiChat = document.querySelector("input[name='isichat']");
  const listChat = document.querySelector("div#list-chat");

  let myPeer = null;
  let myPeerId = undefined;
  let peerConnected = {};

  const peerIdPrompt = prompt(
    "Silahkan isi ID Anda (kata / kalimat unik) ?",
    undefined
  );

  if (peerIdPrompt != undefined) {
    myPeerId = peerIdPrompt;
    peerStatus.innerHTML = "Mengkoneksikan ke server ...";
    BetterLog(`"Mencoba konek ke server dengan id: ${myPeerId}`);

    myPeer = new Peer(myPeerId, {
      host: host,
      port: port,
      path: path,
    });

    myPeer.on("open", function (id) {
      peerId.innerHTML = id;
      BetterLog(`"peer ID: ${id}`);
      peerStatus.innerHTML = "Koneksi Berhasil";
      addKnightToGame(id);
      knightsList[id].state.add("send_position", function () {
        Object.entries(peerConnected).map(([k, v]) => {
          v.send({
            type: "position",
            value: {
              x: knightsList[id].state.get().x,
              y: knightsList[id].state.get().y,
            },
          });
        });
      });
    });

    myPeer.on("error", function (err) {
      console.error("myPeer error", err.type);
      peerStatus.innerHTML = `Koneksi Gagal !${err.type}!`;
    });

    myPeer.on("connection", function (connReceived) {
      handlePeerConnection(connReceived);
    });
  } else {
    peerContainer.style.display = "none";
    chatContainer.style.display = "none";
    listStatusMsg.style.display = "none";
  }

  const addToStatus = (text) => {
    const span = document.createElement("span");
    span.innerHTML = text;
    listStatusMsg.appendChild(span);
  };

  const addToChat = (text) => {
    const span = document.createElement("span");
    span.innerHTML = text;
    listChat.appendChild(span);
  };

  const handlePeerConnection = (connReceived, textStatus = "diterima dari") => {
    connReceived.on("open", () => {
      addToStatus(`Koneksi ${textStatus} ${connReceived.peer}`);
      if (!peerConnected[connReceived.peer]) {
        peerConnected[connReceived.peer] = connReceived;
        addKnightToGame(
          connReceived.peer,
          {
            x: connReceived.metadata.x,
            y: connReceived.metadata.y,
          },
          false
        );
      }

      connReceived.on("data", (data) => {
        if (data.type === "chat") {
          addToChat(`${connReceived.peer}: ${data.value}`);
        }
        if (data.type === "position") {
          knightsList[connReceived.peer].state.set({
            x: data.value.x,
            y: data.value.y,
          });
        }
      });

      connReceived.on("close", () => {
        addToChat(`Koneksi ${connReceived.peer} ditutup`);
        delete peerConnected[connReceived.peer];
      });

      connReceived.on("error", function (err) {
        console.error("connReceived error", connReceived.peer, err);
      });
    });
  };

  formIdTujuan.addEventListener("submit", (e) => {
    e.preventDefault();
    if (myPeer) {
      const peerTujuan = myPeer.connect(inputIdTujuan.value, {
        metadata: {
          x: knightsList[myPeerId].state.get().x,
          y: knightsList[myPeerId].state.get().y,
        },
      });
      handlePeerConnection(peerTujuan, "berhasil terhubung ke");
      inputIdTujuan.value = null;
    }
  });

  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    Object.entries(peerConnected).map(([k, v]) => {
      v.send({
        type: "chat",
        value: inputIsiChat.value,
      });
    });
    addToChat(`Saya: ${inputIsiChat.value}`);
    inputIsiChat.value = null;
  });

  return {
    myPeerId: myPeerId,
  };
};

export default handlePeer;

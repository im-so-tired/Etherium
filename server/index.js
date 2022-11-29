import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
function hashGen() {
  const chrs = "abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789";
  let str = "";
  for (var i = 0; i < 10; i++) {
    let pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
}
const blocks = [
  {
    id: 1,
    nomer: "1",
    hash: "jfkldsajf",
    time: "2022",
    countTrans: 123,
    countCall: 15,
    totalAmount: [10, 1000000],
  },
  {
    id: 2,
    nomer: "2",
    hash: "fjkdsaljfsdalfk",
    time: "2022",
    countTrans: 100,
    countCall: 32,
    totalAmount: [5, 4500000],
  },
];
const transferHistory = [];
const users = [
  { id: 1, email: "markov-pt@mail.ru", phone: "1234", password: "qweasdzxc" },
  { id: 2, email: "markov-pt2@mail.ru", phone: "7777", password: "qweasdzxc" },
];
let auth = {
  email: "",
  password: "",
};
const resolvers = {
  Query: {
    getBlocks: () => blocks,
    getAllUsers: () => users,
    getAuth: () => auth,
    getTransferHistory: () => transferHistory,
  },
  Mutation: {
    addUser: (parent, args) => {
      const user = {
        id: Date.now(),
        email: args.email,
        phone: args.phone,
        password: args.password,
      };
      users.push(user);
      return user;
    },
    setAuth: (parent, args) => {
      auth = {
        email: args.email,
        password: args.password,
      };
      return auth;
    },
    addTransfer: (parent, args) => {
      const transfer = {
        from: args.from,
        to: args.to,
        sum: args.sum,
        message: args.message,
      };
      transferHistory.push(transfer);
      return transfer;
    },
    createBlock: (parent, args) => {
      const hash = hashGen();
      const block = {
        id: blocks.length + 1,
        nomer: blocks.length + 1,
        hash,
        time: Date.now(),
        countTrans: Math.floor(Math.random() * 200),
        countCall: Math.floor(Math.random() * 200),
        totalAmount: [args.sum, args.sum * 1450],
      };
      blocks.push(block);
      return block;
    },
  },
};
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "Schema.graphql"), "utf8"),
  resolvers,
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

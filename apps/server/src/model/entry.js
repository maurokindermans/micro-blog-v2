import { prisma } from "../../lib/prisma.js";

async function read() {
  return await prisma.entry.findMany();
}

async function write(entry) {
  return await prisma.entry.create({ data: entry });
}
const entryModel = { read, write };
export default entryModel;

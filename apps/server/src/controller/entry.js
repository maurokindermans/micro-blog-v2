import entryModel from "../model/entry.js";

async function get(req, res) {
  const entries = await entryModel.read();
  res.json(entries);
}

async function post(req, res) {
  const body = req.body;
  console.log(body);
  if (
    !body.text ||
    !body.author ||
    body.text.length > 250 ||
    body.author.length > 20
  ) {
    res.status(400).json({ error: "invalid entry" });
  } else {
    res.status(201).json({ message: "entry created" });
    const postDate = new Date(Date.now());
    body.postDate = postDate.toISOString();
    entryModel.write(body);
  }
}

const entryController = { get, post };

export default entryController;

const notFound = (res, field, value) => res.status(400).json({ error: `<${field}> ${value} not found.` });
const server = (res, err) => res.status(500).json(err);

export default { notFound, server };

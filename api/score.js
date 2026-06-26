module.exports = async (req, res) => {

  const r = await fetch(`${process.env.TRUSTOS_API_URL}/v1/decision/score`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      "x-api-key": process.env.TRUSTOS_API_KEY

    },

    body: JSON.stringify(req.body || {})

  });



  const text = await r.text();

  res.status(r.status).setHeader("Content-Type", "application/json");

  res.send(text);

};

notepad api\log.js

module.exports = async (req, res) => {

  const r = await fetch(`${process.env.TRUSTOS_API_URL}/v1/decision/log`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      "x-api-key": process.env.TRUSTOS_API_KEY

    },

    body: JSON.stringify(req.body || {})

  });



  const text = await r.text();

  res.status(r.status).setHeader("Content-Type", "application/json");

  res.send(text);

};

notepad api\verify.js

module.exports = async (req, res) => {

  const id = req.query.id;



  const r = await fetch(`${process.env.TRUSTOS_API_URL}/v1/decision/verify/${id}`, {

    method: "GET",

    headers: {

      "Content-Type": "application/json",

      "x-api-key": process.env.TRUSTOS_API_KEY

    }

  });



  const text = await r.text();

  res.status(r.status).setHeader("Content-Type", "application/json");

  res.send(text);

};
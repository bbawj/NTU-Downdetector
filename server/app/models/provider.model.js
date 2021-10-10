const sql = require("./db.js");

// constructor
const Provider = function(provider) {
  this.name = provider.name;
  this.downTimes = provider.downTimes;
};

// methods
Provider.create = (newProvider, result) => {
  sql.query("INSERT INTO providers SET ?", newProvider, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created provider: ", { id: res.insertId, ...newProvider});
    result(null, { id: res.insertId, ...newProvider });
  });
};

Provider.findById = (providerId, result) => {
  sql.query(`SELECT * FROM providers WHERE id = ${providerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found provider: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Provider with the id
    result({ kind: "not_found" }, null);
  });
};

Provider.getAll = result => {
  sql.query("SELECT * FROM providers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("providers: ", res);
    result(null, res);
  });
};

Provider.updateById = (id, provider, result) => {
  sql.query(
    "UPDATE providers SET name = ?, downTimes = ?, WHERE id = ?",
    [provider.name, provider.downTimes, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated provider: ", { id: id, ...provider });
      result(null, { id: id, ...provider });
    }
  );
};

Provider.remove = (id, result) => {
  sql.query("DELETE FROM providers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {

      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted provider with id: ", id);
    result(null, res);
  });
};

Provider.removeAll = result => {
  sql.query("DELETE FROM providers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} providers`);
    result(null, res);
  });
};

module.exports = Provider;

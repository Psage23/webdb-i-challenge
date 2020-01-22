const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();


router.get("/", (req, res) => {
    db("accounts")
    .select("*")
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json({
        error: "get accounts problem. "
        });
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .select("*")
        .where({ id })
        .then(account => {
        if (account[0]) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "Invalid ID" });
        }
        })
        .catch(error => {
            res.status(500).json({
            error: "Database Problem",
            });
        });
    });
    
router.post("/", (req, res) => {
const accountData = req.body;

    db("accounts")
        .insert(accountData)
        .then(createAcct => {
            res.status(201).json(createAcct);
        })
        .catch(error => {
            res.status(500).json({
            error: "error in creating accounts"
        });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
        
    db("accounts")
        .where({ id })
        .then(updateAcct => {
        res.status(200).json(updateAcct)
    })
    .catch(error => {
        res.status(500).json({ error: "not able to update account" });
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    db('accounts')
    .where({id})
    .del()
    .then(deleteAcct => {
       res.status(200).json(deleteAcct)
    }) 
    .catch(error => {
       res.status(500).json({error: 'unable to delete account'})
      }) 
    });
        
    



module.exports = router;
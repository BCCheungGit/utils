app.put("/registrants/medical/:person_id", async (req, res) => {
    try {
      const { person_id } = req.params;
      //console.log("UPDATE v_registrants SET checkedin="+getdate()+ ` WHERE pid =`)
      await pool.query(
           "UPDATE peoplejs SET vaccination='" + getdate() + `' WHERE (details ->> 'id'::text) = $1`,
        [person_id]
      );
  
      res.status(200).json("registrants was updated");
    } catch (err) {
      console.error(err.message);
    }
  });
  
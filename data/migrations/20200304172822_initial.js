
//if this was writen in a different DBMS, there would be an issue with creating species after animals
exports.up = async function(knex) {
  await knex.schema.createTable("zoos", (tbl) =>{
  	tbl.increments("id")
  	tbl.string("name").notNull()
  	tbl.string("address").notNull().unique()
  })

  await knex.schema.createTable("species", (tbl) =>{
  	tbl.increments("id")
  	tbl.text("name").notNull().unique()
  })

  await knex.schema.createTable("zoos_animals", (tbl) =>{
  	tbl.integer("zoo_id")
  	  	.references("id")
  		.inTable("zoos")
  		.onDelete("CASCADE")
  	tbl.integer("animal_id")
  	  	.references("id")
  		.inTable("animals")
  		.onDelete("CASCADE")
  	tbl.date("from_date")
  	tbl.date("to_date")
  	//make the primary key a combo of two columns
  	tbl.primary(["zoo_id", "animal_id"])

  })

  await knex.schema.createTable("animals", (tbl) =>{
  	tbl.increments("id")
  	tbl.text("name").notNull()
  	tbl.integer("species_id")
  		.references("id")
  		.inTable("species")
  		//alows changes
  		.onUpdate("CASCADE")
  		//sets forign key to null rather than err - can't CASACADE onDelete because we have another table. need to add an onDelete on the other tables. Cascade wll delete every row refferencing that species.
  		.onDelete("SET NULL")
  })

};
exports.down = async function(knex) {
//order is important here
 await knex.schema.dropTableIfExists("zoos_animals")
 await knex.schema.dropTableIfExists("animals")
 await knex.schema.dropTableIfExists("species")
 await knex.schema.dropTableIfExists("zoos")

};

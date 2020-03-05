//this table will clear seeds in the right order
//there is an issue with cleaner found in TK - 'knexCleaner'
exports.seed = async function(knex) {
	await knex("zoos_animals").truncate()
	await knex("animals").truncate()
	await knex("species").truncate()
	await knex("zoos").truncate()
}
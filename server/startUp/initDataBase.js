const professionMock = require("../mock/professions.json")
const qualitiesMock = require("../mock/qualities.json")
const Profession = require("../models/Profession")
const Quality = require("../models/Quality")

async function createInitEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}

module.exports = async () => {
    const professions = Profession.find()
    if (professions.length !== professionMock.length) {
        await createInitEntity(Profession, professionMock)
    }

    const qualities = Quality.find()
    if (qualities.length !== qualitiesMock.length) {
        await createInitEntity(Quality, qualitiesMock)
    }
}
const express = require("express")
const chalk = require("chalk")
const cors = require("cors")
const config = require("config")
const mongoose = require("mongoose")
const initDataBase = require("./startUp/initDataBase")
const routes = require("./routes")

const PORT = config.get("port") ?? 8080

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use("/api", routes)

/*if (process.env.NODE_ENV === "production") {
    console.log(chalk.bgBlue.black("Production"))
} else if (process.env.NODE_ENV === "development") {
    console.log(chalk.bgRed.black("Development"))
}*/

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDataBase()
        })
        await mongoose.connect(config.get("connectUri"))
        console.log(chalk.green(`MongoDB connected...`))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        })
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()


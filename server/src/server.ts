import * as bodyParser from "body-parser"; 
// import * as compression from "compression";
// import * as cookieParser from "cookie-parser";
// import * as cors from "cors";
// import * as helmet from "helmet";
// import * as mongoose from "mongoose";
// import * as logger from "morgan";
import express from "express";
import * as path from "path";
import EditorRouter from "./routers/Editor/EditorRouter";
import VuforiaRouter from "./routers/VuforiaRouter"

class Server {
    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // application config
    public config(): void {
        // const MONGO_URI: string = "mongodb://localhost/tes";
        // mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        // set views directory
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(cookieParser());
        // this.app.use(logger("dev"));
        // this.app.use(compression());
        // this.app.use(helmet());
        // this.app.use(cors());

        // cors
        /* this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:8080");
            res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            );
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
            );
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        }); */
        // set static file folder
        this.app.use(
            express.static(path.join(__dirname, "../../client/dist"), {
                maxAge: 31557600000
            })
        );
    }

    // application routes
    public routes(): void {
        const router: express.Router = express.Router();
        router.get("/", (req, res,) => {
            res.sendFile("index.html");
        })
        this.app.use("/", router);
        this.app.use("/api/vuforia", VuforiaRouter);
    }
}

// export
export default new Server().app;

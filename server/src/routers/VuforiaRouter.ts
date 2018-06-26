import { Request, Response, Router, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs";
import * as formidable from "formidable";
import * as vuforia from 'vuforiajs';

const client = vuforia.client({
  // Server access key (used for Vuforia Web Services API)
  accessKey: "4ed6b7bb9cee3d2c1de723c27638962ede29c883",
  // Server secret key (used for Vuforia Web Services API)
  secretKey: "65a471d9eabdae48b05ef6bf9013efd1415821c5",
  // Client access key (used for Vuforia Cloud Recognition API)
  clientAccessKey: "8a903e18a61bdfff27d336d31f781f1c890e99be",
  // Client secret key (used for Vuforia Cloud Recognition API)
  clientSecretKey: "59e321f549a0b72324c74fea7a9e030bb1d399a1"
});

const util = vuforia.util();

// TODO: Separate file processing to its own logic
export class VuforiaRouter {
  public router: Router;
  

  constructor() {
    this.router = Router();
    this.routes();
  }

  public initial(req: Request, res: Response) {
      res.send("initial");
  }

  public getMarkerNames(req: Request, res: Response) {
    fs.readdir(
      path.join(__dirname, '../../../client/dist/assets/images/textures/markers' /* "../../../client/public/textures/markers" */),
      (err, files) => {
        if (err) {
          console.log("Error getting marker");
          throw err;
        }
        // else if (files.length === 0) {
        //     console.log("Marker directory empty.");
        //     res.render('editor');
        //     res.end();
        // } else {
        //     console.log("Sending files");
        //     res.send(files);
        // }
        //console.log(files.length);
        res.send(JSON.stringify(files));
        // res.end();
      }
    );
  }

  public uploadMarkers(req: Request, res: Response) {
    let form = new formidable.IncomingForm();
    let sentFiles: any = [];
    let sentFields: any = [];
    form.uploadDir = path.join(__dirname, '../../../client/dist/assets/images/textures/markers');
    // on field load
    form.on('field', (field, value) => {
      sentFields.push([field, value]);
    });
    // on file load
    form.on('file', (field, file) => {
      sentFiles.push([field, file]);
    })
    
    form.on('end', () => {
      let fileRenameCountdown: number = sentFiles.length;
      for (let i = 0; i < sentFiles.length; i++) {
        let targetName: string = sentFiles[i][1].name;
        let destPath: string = path.join(form.uploadDir, sentFiles[i][1].name);
        let target = {
          // name of the target, unique within a database
          name: targetName,
          // width of the target in scene unit
          // TODO: get this info from the client
          width: 32.0, 
          // the base64 encoded binary recognition image data
          image: util.encodeFileBase64(sentFiles[i][1].path),
          // indicates whether or not the target is active for query
          active_flag: true,
          // the base64 encoded application metadata associated with the target
          application_metadata: util.encodeBase64("Metadata for...")
        };
        // add targets to Vuforia
        client.addTarget(target, (err: any, result: any) => {
          if (err) {
            console.error("Error adding target: " + result.result_code);
            // res.redirect("/"); //TODO: redirect to error page.
          } else {
            console.log("Target Uploaded to Vuforia: " + result.result_code);
            // Move the uploaded marker target to the public directory to be used by ThreeJS textures.
            // let fileExt = path.extname(destPath);
            let fileExt = path.extname(sentFiles[i][1].name);
            let newFileName = result.target_id + fileExt;
            let destPath = path.join(
              __dirname,
              /* "../../../client/public/textures/markers" */
              '../../../client/dist/assets/images/textures/markers',
              newFileName
            );
            // rename targets to target_id assigned from Vuforia
            fs.rename(sentFiles[i][1].path, destPath, (err: NodeJS.ErrnoException) => {
              if (err) {
                console.error("Error renaming marker to assigned target_id.");
              } else {
                fileRenameCountdown--;
                // wait unti all files have been renamed to send list of uploaded markers to the client.
                if (fileRenameCountdown === 0) { 
                  fs.readdir(
                    path.join(__dirname, '../../../client/dist/assets/images/textures/markers' /* "../../../client/public/textures/markers" */),
                    (err, files) => {
                      if (err) {
                        console.log("Error getting marker");
                        throw err;
                      } else {
                        //res.send(JSON.stringify(files));
                        var mesg = 'tees';
                        res.send(JSON.stringify(mesg));
                      } 
                    }
                  );

                  // client.retrieveTarget('07532c46d79542ab914ef79e88e3a5de', (err: any, result:any)=>{

                  //   if(err){
                  //     console.log("error in retrieving target");
                  //   }
                  //   else{

                  //     console.log("target retrieved successfully");
                  //   }

                  // });
                }
              }
            });
          }
        });
        
      }
    });
    form.parse(req);
  }

  

// public retrieveTarget(req: Request, res: Response, next: NextFunction){
  
// }



  public retrievePresentation(req: Request, res: Response, next: NextFunction) {
    let fileName = req.params.dataName;
    let options = {
      root: path.join(__dirname, "../../db/presentation_data")
    };
    res.sendFile(fileName, options, err => {
      if (err) next(err);
      else console.log("Presentation Data sent:", fileName);
      res.end();
    });
  }

  public savePresentation(req: Request, res: Response) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../../db/presentation_data");
    form.parse(req, (err, fields, files) => {
      if (err) console.log("error here");
      /* var fileName = files.scene.name; */ // || 'scene.json';
      let oldPath = files.scene.path;
      let parsedName = path.parse(files.scene.name).name;
      let fileName = parsedName + ".json";
      let destPath = path.join(form.uploadDir, fileName);
      fs.rename(oldPath, destPath, (err) => {
        if (err) throw err;
        res.end();
      });
    });
  }

  public routes() {
    this.router.get("/", this.initial);
    //this.router.get("/get_markers", this.getMarkerNames);
    this.router.post("/upload_marker", this.uploadMarkers);
    this.router.get("/presentation/:dataName", this.retrievePresentation);
    this.router.post("/save/scene", this.savePresentation);
  }
}

const vuforiaRouter = new VuforiaRouter();

export default vuforiaRouter.router as Router;

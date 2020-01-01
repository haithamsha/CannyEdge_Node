import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {spawn} from 'child_process';

import { Car, cars as cars_list } from './cars';

(async () => {

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to canny-edge_node");
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/img/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/img", 
    async ( req: Request, res: Response ) => {

      // const { file } = req.body;
      
      // if ( !file ) {
      //   return res.status(400)
      //             .send(`file is required`);
      // }

      const pythonProcess = spawn('python3', ["src/image_filter.py", "/" + 'src/1.PNG']);

      if(pythonProcess !== undefined) {

          pythonProcess.stdout.on('data', (data) => {
            return res.status(200)
                .send(data);
              // console.log('data: ', data);
          });
      }


      
  } );

 

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
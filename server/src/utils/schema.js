import fs from 'fs';
import path from 'path';


function loadSchemaType(type) {
    return new Promise(function (resolve, reject) {
        const pathToSchema = path.join(
            process.cwd(), `src/types/${type}/${type}.gql`
        )

        fs.readFile(
            pathToSchema,
            {encoding: 'utf-8'},
            function (err, schema) {
                if (err){
                    return reject(err)
                }
                resolve(schema)
            }
        )
    })
};

export default loadSchemaType;
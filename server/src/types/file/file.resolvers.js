'use strict';
// libraries:
import AWS from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import keys from '../../config/keys'
import {authenticated} from "../../utils/auth";
//==============================================================================

const S3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
})

async function awsSignedUrl(parent, args, context, info) {
    console.log(context.user)
    var _file_key = `${context.user.id}/${uuidv4()}.jpeg`

    function getSignedUrl() {
        return new Promise(
            function resolveSignedUrl(resolve, reject) {
                S3.getSignedUrl('putObject', {
                        Bucket: keys.bucket,
                        ContentType: 'jpeg',
                        Key: _file_key
                    },
                    function postRequest(err, url) {
                        if (err) {
                            reject(err)
                        }
                        resolve(url)
                    }
                )
            }
        )
    }

    var result = {
        url: await getSignedUrl(),
        key: _file_key
    }
    console.log(result)

    return result
}

export default {
    Query: {
        awsSignedUrl: authenticated(awsSignedUrl)
    },
}

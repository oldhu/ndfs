var express = require('express')
var app = express()

function jsonToXML(json, indent) {
  if (indent == null) {
    indent = "";
  }
  result = ""
  for (var key in json) {
    var value = json[key]
    if (value instanceof Array) {
      for (var index in value) {
        result += indent + "<" + key + ">\n"
        result += jsonToXML(value[index], indent + "  ")
        result += indent + "</" + key + ">\n"
      }
    } else {
      result += indent + "<" + key + ">"
      if (typeof value == 'object') {
        result += "\n" + jsonToXML(value, indent + "  ") + indent
      } else {
        result += value
      }
      result += "</" + key + ">\n"
    }
  }
  return result;
}

/*
 * http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTServiceGET.html
 * no argument
 * return all services
 */
function getService() {
  return jsonToXML({
    ListAllMyBucketsResult: {
      Owner: {
        ID: "bcaf1ffd86f461ca5fb16fd081034f",
        DisplayName: "webfile"
      },
      Backets: {
        Backet: [
          {
            Name: "quotes",
            CreationDate: "2006-02-03T16:45:09.000Z"
          },
          {
            Name: "samples",
            CreationDate: "2006-02-03T16:41:58.000Z"
          }
        ]
      }
    }
  })
}

/*
 * http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGET.html
 */
function getBacket(backet) {

}

/*
 * http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUT.html
 */
function putBacket(backet) {

}

var BACKET_RE = /(.+)\.s3\.amazonaws\.com/

function dispatchByHost(host, rootFunc, backetFunc) {
  if (host == 's3.amazonaws.com') {
    if (rootFunc) {
      rootFunc()
    }
    return
  }
  var m = host.match(BACKET_RE)

  if (m) {
    var backet = m[1]
    if (backetFunc) {
      backetFunc(backet)
    }
  }  
}

app.get('/', function(req, res) {
  var host = req.headers['host']
  dispatchByHost(host,
    function() {
      res.send(getService());
    },
    function(backet) {

    }
  )

  res.send('Hello World')
  console.log(req.headers)
})

app.put('/', function(req, res) {
  var host = req.headers['host']
  dispatchByHost(host, null,
    function(backet) {

    }
  )  
})

app.listen(3000)
console.log("running on *:3000")
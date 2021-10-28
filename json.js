const https = require('https');

let url = 'https://coderbyte.com/api/challenges/json/json-cleaning';

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
	    for (let property in json) {
		if (json[property] instanceof Object) {
		    for (let p in json[property]) {
			if (json[property][p] === '') {
			    delete json[property][p];
			}
			if (json[property][p] === 'N/A') {
			    delete json[property][p];
			}
		    }
		}
		if (json[property] === '-') {
		    delete json[property];
		}
	    }
	    console.log(json)
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

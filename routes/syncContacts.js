var connection = require('./dbConnection');
var validToken = require('./validate');
exports.syncContacts=function(req,res){
    validToken.validate(req,res);
   var data = {
        "error":0,
	    "Message":"",
        "UID":""
    };  
if (!req.body) 
	return res.sendStatus(400);
var contact;
var contacts = req.body.contacts;
console.log("Contacts"+contacts);
for(i=0;i<contacts.length;i++){
		contact = contacts[i];
       		contact["UID"]= req.body.UID;
		//contact.CreationDate = new Date();
		connection.query('INSERT INTO AllContacts SET ?', contact , function(err){
            if(err) {
                try{
                    throw err;
                }catch(err){
                
                    data["error"] = 1;
	                data["Message"]="SQL Error While Synching Contacts";
	                data["UID"] =req.body.UID;
			console.log(err);
                    try{
	                    res.status(200).json(data);
                    }catch(err){
                        console.log(err);
                    }
                }
            }else{
                 data["error"] = 0;
	            data["Message"]="Contacts Synced successfully";
	            data["UID"] =req.body.UID;
                try{
	                res.status(200).json(data);
                }catch(err){
                    console.log(err);
                }
            }
        })
	}
};
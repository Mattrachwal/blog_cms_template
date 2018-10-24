"use strict";

class CRUDLService {

    constructor(model) {
        this.model = model;
    }

    // ==============================================
    // METHODS
    // ==============================================

    // ==============================================
    // CRUDL
    // ==============================================

    _create (doc)
    {
        return new Promise((resolve, reject) => {
            const promise = doc.save();
            promise.then((doc) => {
                if (!doc) {
                    reject(new Error("The New Document Is Empty", doc));
                } else {
                    resolve(doc);
                }
            }, (err) => {
                reject(new Error("Blew Up Creating New Document", err));
            });
        });
    }

    _retrieve (searchParams)
    {
        return new Promise((resolve, reject) => {
            this.model.findOne(searchParams).exec()
                .then( (doc) => {
                    resolve(doc);
                }, (err) => {
                    reject(new Error("Something Blew Up When Retrieving A Model", err));
                });
        });
    }

    _update (doc, callback)
    {
        doc.update(doc, (err, doc) => {
            callback(err, doc);
        });
    }

    _delete (doc, callback)
    {
        doc.delete(doc, (err) => {
            callback(err);
        });
    }

    _list (searchParams, callback)
    {
        this.model.find(searchParams, (err, docs) => {
            callback(err, docs);
        });
    }

}
module.exports = CRUDLService;
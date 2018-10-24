"use strict";

const CRUDLService = require('./crudl_service');
const Bcrypt = require('bcrypt');

class UserService extends CRUDLService {

    constructor(model) {
        super(model);
    }

    // ==============================================
    // METHODS
    // ==============================================

    getValidatedUser (payload, callback) {
        this.retrieveModel({email: payload.email}, (err, user) => {
            if(user && payload.password === user.password) {
                const cleanUser = {
                    name: user.name,
                    email: user.email
                };
                callback(err, cleanUser);
            } else {
                callback(err)
            }
        });
    }

    async registerUser (payload) {
        let user = await this.retrieveModel({email: payload.email});
        if (user) {
            console.log("User was found");
            throw "User Already Exists";
        } else {
            return this.createModel(payload);
        }
    };

    // registerUser = new Promise (payload, (resolve, reject) => {
    //     const user = this.retrieveModel({email: payload.email});
    //     if (user){
    //         reject(new Error("User Exists"));
    //     } else {
    //         resolve(this.createModel(payload));
    //     }
    // });





    // ==============================================
    // CRUDL
    // ==============================================

    async createModel (payload) {
        const saltRounds = 10;
        const salt = await Bcrypt.genSaltSync(saltRounds);
        const hash = await Bcrypt.hashSync(payload.password, salt);
        const user = await new this.model({
            name: payload.name,
            email: payload.email,
            password: hash,
            updated: new Date()
        });
        return await this._create(user);
    }

    retrieveModel (searchParams) {
        return new Promise((resolve, reject) => {
            this._retrieve(searchParams)
                .then((result) => {
                    if (!result) {
                        reject(new Error("Result was undefined", result));
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    updateModel (doc, callback) {
        this._update(doc, callback);
    }

    deleteModel (doc, callback) {
        this._delete(doc, callback);
    }

    listModels (searchParams, callback) {
        this._list(searchParams, callback);
    }

}
module.exports = UserService;
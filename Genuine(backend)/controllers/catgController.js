const handlerFactory = require("./handlerFactory");
const Catg = require("../models/category");

exports.createNewCatg = handlerFactory.createResource(Catg);

exports.getManfCatg = async (req, res, next) => {
    try{
        console.log(req.params.id)
            let query = Catg.find({mfId:req.params.id});
            const doc = await query;
    
            res.status(200).json({
                status: 'success',
                data: doc
            });
            return next();
        }catch(error){
        next(error);
        }
};



exports.getCatgPrd = async function(req, res, next){
    try{
        let query = Catg.findById(req.params.id).select("prd");
        let docs = await query;
        res.status(200).json({
            status:"success",
            docs: docs
        });
    }catch(error){
        next(error);
    }
}

exports.makeCatgPrd = async function(req, res, next){
    try{
        let query = Catg.findById(req.params.id);
        let docs = await query;
        const len = docs.prd.length;
        console.log(docs);
        docs.prd.push(req.body);
        let query2 = Catg.findByIdAndUpdate(req.params.id, {$set:{prd: docs.prd}});
        let docs2 = await query2;
        console.log(docs2)
        res.status(200).json({
            status:"success",
            docs: docs2
        });
    }catch(error){
        next(error);
    }
}
const mongoose = require ("mongoose")

const ManfSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email:{
		type: String,
		required: true
	},
	phNo:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	notifications: Number,
	requests: [{
		_id: String,
		name: String,
		phNo: String,
		address: String,
		email: String,
		adate: String
	}],
	distr:[{
		_id: String,
		name: String,
		email: String,
		phNo: String,
		address: String
	}],
	catg:[{
		name:{
			type: String,
			unique: true
		},
		createdOn:String,
		prdCount: Number,
		products:[{
			image: String,
			title: String,
			name: String,
			price: String,
			manfDate: String,
			expDate: String,
			warranty:String,
			desc: String,
			crtOn: String,
			status: String,
			distr:[{
				_id: false,
				profile:{
					_id: String,
					name: String,
					email: String,
					phNo: String,
					address: String
				},
				labels:[{
					sdate: String,
					no: Number,
					location: {
						state: String,
						city: String
					},
					status: String,
					gDate: String
				}
			]
			}]
		}]
	}]
})

const Manf = mongoose.model("Manf", ManfSchema)

module.exports =  Manf
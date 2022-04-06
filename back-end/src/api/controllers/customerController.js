import Customer from "../models/customer";
import User from "../models/user";
import EmailSend from "../helpers/email";
import Order from "../models/orders";


const createCustomer = (req, res) => {
    
    const {
        firstName,
        lastName,
        email,
        password,
        Address,
        zipCode,
        phone,
        city
    } = req.body;

    const UserData = {
        firstName,
        lastName,
        email,
        password,
        role: "CUSTOMER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            // logger.error(err);
            return res.status(400).send(err)

        }
        const CostumerData = {
            Address: Address,
            city: city,
            zipCode : zipCode,
            phone : phone,
            user: user._id,
            _id: user._id, 

        }
        const costumer = new Customer(CostumerData);
        costumer.save(async (err, Manager) => {

            if (err) {
                const user = await User.findById({
                    _id: user._id
                })
                user.remove()
                // logger.error(err);
                return res.status(400).send(err)
            }
            

            //Email Verification
            const { id } = user._id;

            let subj = "Inoformation";
            let msg = `confirm_email : http://localhost:3030/api/customer/confirmEmail/${id}`;
            EmailSend.mail(email, subj, msg)
            
            user.hashed_password=undefined
            user.salt=undefined
            
            // logger.info(`Costumer user:${req.body.username} created!`);
            return res.json({
                user,
                costumer
            })
        })

    })
}

const confirmEmail = async (req, res) => {

            try {
            const { id } = req.params;
            await Customer.findOneAndUpdate({id}, {"isVerified":true});

            res.status(200).json({
                status: true,
                message: "Your Account is now Verified"
            })

            } catch (e) {
            res.status(400).json({
                status: false,
                message: e.message
                })
            }
}

const updateCustomer = async (req, res) => {
    console.log(req.body)
    try {
       if (req.body.username) {
          await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
       }
       if (req.body.email || req.body.password) {
          await User.findOneAndUpdate({ _id: req.params.id }, req.body.email)
       }
       logger.info(`Customer user:${req.body.username} Updated!`);
       res.status(200).json({
          status: true,
          message: "Updated successfuly"
       })
    } catch (err) {
        logger.error(err);
       res.status(400).json({
          status: false,
          message: err
       })
    }
 }
const removeSeller = async (req, res) => {

    const {
        id,
    } = req.params
    const seller = await Seller.findById({
        _id: id
    })
    seller.remove((err,result)=>{
        if(err){
            logger.error(err);
        }
        logger.info(`Seller user:${seller.username} deleted!`);
        res.status(200).json({
            status: true,
            message: "Deleted successfully"
         })
    })
    
}
const searchSeller = async (req, res) => {
    let sortBy=req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'asc'
    let limit =req.query.limit ? parseInt(req.query.limit):100
    let skip = parseInt(req.body.skip)
    let findArgs = {}
for(let key in req.body.filters){
    if(req.body.filters[key].length > 0){
        
    }
}

    const {
        id,
    } = req.params
    const seller = await Seller.findById({
        _id: id
    })
    seller.remove((err,result)=>{
        if(err){
            logger.error(err);
        }
        logger.info(`Seller user:${seller.username} deleted!`);
        res.status(200).json({
            status: true,
            message: "Deleted successfully"
         })
    })
    
}

const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find().populate("user")
        res.status(200).json({
            status: true,
            sellers

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}

const getSeller = async (req, res) => {
    const id = req.params.id
    try {
        const seller = await Seller.findById({
            _id: id
        }).populate("user")
        res.status(200).json({
            status: true,
            seller
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}


// create orders
const createOrder = async (req, res) => {
    const {
        
        products,
        quantity,
        status,
    } = req.body;

    const order = new Order({
        products,
        quantity,
        status,
    });

    try {
        const savedOrder = await order.save();
        res.status(200).json({
            status: true,
            data: savedOrder
        })
    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}








export {createCustomer,confirmEmail,createOrder}
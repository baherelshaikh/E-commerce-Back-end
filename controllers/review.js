const Review = require('../models/Review')
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')


const createReview = async (req, res)=>{
    const {productId} = req.body

    const isProductExist = await Product.findOne({_id: productId})
    if(!isProductExist) throw new CustomError.NotFoundError(`No product with id: ${productId}`)

    const isReviewExist = await Review.findOne({
        product: productId,
        user: req.user.userId
    })
    if(!isReviewExist) throw new CustomError.BadRequestError('There is an already submitted review ')

    req.body.user = req.user.userId
    const review = await Review.create(req.body)

    res.status(StatusCodes.CREATED).json({ review });
}

const getSingleProductReviews = async (req, res) => {
    const { id: productId } = req.params
    const reviews = await Review.find({ product: productId })
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

module.exports = { getSingleProductReviews }
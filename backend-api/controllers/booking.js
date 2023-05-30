import BookingModel from "../models/booking.js";

export const createBooking = async (req,res) => {
    const { userId } = req;
    const {
        place, 
        checkIn, 
        checkOut, 
        numberOfGuests, 
        name, 
        email, 
        mobile, 
        price
    } = req.body;      

    const newBooking = new BookingModel({place, checkIn, checkOut, numberOfGuests, name, email, mobile, price, user:userId});

    try {
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
}

export const getAllBookings = async (req,res) => {
    const { userId } = req;
    try {
        const allBookings = await BookingModel.find({user:userId}).populate('place');
        res.status(200).json(allBookings);
        
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }

}




        
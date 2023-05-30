
import mongoose from "mongoose";
import PlaceModel from "../models/places.js";
import UserModel from "../models/users.js";

export const getPlace = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`There is no place with id: ${id}`);
  try {
    const place = await PlaceModel.findById(id);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getAllPlaces = async (req, res) => {
  
  try {
    const places = await PlaceModel.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getUserPlaces = async (req, res) => {
  const { userId } = req;
  
  try {
    const userPlaces = await PlaceModel.find({ owner: userId });
    res.status(200).json(userPlaces);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const createPlace = async (req, res) => {
  const { userId } = req;

  const {
        title, adress,
        photosAdded, extraInfo,
        perks, maxGuests, checkIn,
        checkOut, description, price
    } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User dose not exist" });

    const placeDoc = await PlaceModel.create({
            owner: userId,
            title, 
            adress,
            photos: photosAdded, 
            extraInfo,
            perks, 
            maxGuests, 
            checkIn,
            checkOut, 
            description, 
            price
        })
        res.status(201).json(placeDoc)

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const editPlace = async (req,res) => {
  const { userId } = req;
  const { 
    id,    
    title, 
    adress,    
    photosAdded, 
    extraInfo,    
    perks, 
    maxGuests, 
    checkIn,    
    checkOut, 
    description, 
    price
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No place with id: ${id}`);
    const placeDoc = await PlaceModel.findById(id);
    if(userId !== placeDoc.owner.toString()) return res.status(405).send(`Your not owner of this place`);

    try {
      placeDoc.set({
           title, adress,
           photos: photosAdded, extraInfo,
           perks, maxGuests, checkIn,
           checkOut, description, price
       });
       await placeDoc.save();
       res.status(200).json(placeDoc);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }

}
const express = require("express");
const mongoose = require("mongoose");
const Airport = require('../models/airport');
const catchAsync = require("../utils/catch-async");

const router = express.Router();

const airports = [
  {
    id: "NRT",
    name: "나리타 국제 공항",
    coordinates: { lat: 35.772786483505165, lng: 140.39289985540384 },
    description: "나리타공항입니다"
  },
  {
    id: "HND",
    name: "도쿄 국제 공항",
    coordinates: { lat: 35.55666, lng: 139.7794 },
    description: "도쿄 공항입니다"
  },
  {
    id: "NGO",
    name: "주부 국제 공항",
    coordinates: { lat: 34.85981054979349, lng: 136.81159292289627 },
    description: "주부 공항입니다"
  },
  {
    id: "ITM",
    name: "오사카 국제 공항",
    coordinates: { lat: 34.78871717162768, lng: 135.43792274211333 },
    description: "오사카 공항입니다"
  },
  {
    id: "KIX",
    name: "간사이 국제 공항",
    coordinates: { lat: 34.43346032774335, lng: 135.2304308696607 },
    description: "간사이 공항입니다"
  },
  {
    id: "FUK",
    name: "후쿠오카 공항",
    coordinates: { lat: 33.59053791241866, lng: 130.44668764021972 },
    description: "후쿠오카 공항입니다"
  }
];
router.get("/",catchAsync( async(req, res) => {
  const airports = await Airport.find().exec();
  // const payload = airports.map((airport) => {
  //   return {
  //     id: airport.code,
  //     name: airport.name,
  //     coordinates: airport.coordinates,
  //     description: airport.description,
  //   };
  // });
  // res.send(airports);
  res.send(airports);
}));

module.exports = router;

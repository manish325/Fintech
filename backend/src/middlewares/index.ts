import express from "express";
import cors from "cors";

export const applymiddlewares = (app : express.Application) =>{
    app.use(cors());
    app.use(express.json());
}
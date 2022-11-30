import { Request, Response } from "express";
import { db } from "../configration/dataBase";

const record = db.collection("records");

const add = async (req: Request, res: Response) => {
  try {
    const resp = await record.insertMany(req.body);
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
    });
  }
};

const fetch = async (req: Request, res: Response) => {
  try {
    req.body = req.body ? req.body : {};
    let resp;
    var count;
    if ((req.body.skip || req.body.skip === 0) && req.body.take) {
      resp = await record
        .find(req.body.where)
        .skip(req.body.skip)
        .limit(req.body.take).toArray;
      count = await record.countDocuments();
      console.log("Count:", count);
    } else if ((req.body.remove || req.body.remove == 0) && req.body.size) {
      resp = await record
        .find({
          $or: [
            { name: { $regex: ".*" + req.body.name + ".*" } },
            { address: { $regex: ".*" + req.body.address + ".*" } },
          ],
        })
        .limit(req.body.size)
        .skip(req.body.remove)
        .toArray();
      count = await record.countDocuments();
      console.log(count);
    } else {
      resp = await record.find(req.body).toArray();
    }
    console.log(resp);
    res.status(200).json({
      response: resp,
      totalRecords: count,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
    });
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const resp = await record.deleteOne({ Name: name });
    console.log(resp);
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
    });
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const resp = await record.updateOne(
      { name: name },
      {
        $set: {
          address: req.body.address,
        },
      }
    );
    console.log(resp);
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: null,
    });
  }
};
export { add, fetch, remove, update };

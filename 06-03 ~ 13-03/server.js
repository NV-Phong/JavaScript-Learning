import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });
import express from "express";
const APP = express();
APP.use(express.json());
import productRoutes from "./routes/product.route.js";
import MONGOOSE from "mongoose";

let students = [];
class Student {
   constructor(HoTen, DiemTB) {
      this.ID = GenID(16);
      this.MSSV = GenMSSV(11);
      this.HoTen = HoTen;
      this.DiemTB = DiemTB;
      this.IsDeleted = false;
   }
}

function GenID(length) {
   let source =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   for (let index = 0; index < length; index++) {
      let rd = Math.floor(Math.random() * source.length);
      result += source.charAt(rd);
   }
   return result;
}

function GenMSSV(length) {
   let result = "";
   for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
   }
   return result;
}

//--------------------------------------------------CREATE--------------------------------------------------//

APP.post("/students", (req, res) => {
   let { HoTen, DiemTB } = req.body;
   let newSTUDENT = new Student(HoTen, DiemTB);
   students.push(newSTUDENT);
   res.status(201).json(newSTUDENT);
});

//--------------------------------------------------READ--------------------------------------------------//

APP.get("/students", (req, res) => {
   let listSTUDENTS = students.filter((student) => !student.IsDeleted);
   res.json(listSTUDENTS);
});

//--------------------------------------------------UPDATE--------------------------------------------------//

APP.put("/students/:id", (req, res) => {
   let { HoTen, DiemTB } = req.body;
   let studentIndex = students.findIndex(
      (student) => student.ID === req.params.id && !student.IsDeleted
   );

   if (studentIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
   }

   if (HoTen) students[studentIndex].HoTen = HoTen;
   if (DiemTB !== undefined) students[studentIndex].DiemTB = DiemTB;

   res.json({
      message: "Cập nhật thành công",
      student: students[studentIndex],
   });
});

//--------------------------------------------------DELETE--------------------------------------------------//

APP.delete("/students/:id", (req, res) => {
   let studentIndex = students.findIndex(
      (student) => student.ID === req.params.id && !student.IsDeleted
   );

   if (studentIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
   }

   students[studentIndex].IsDeleted = true;
   res.json({
      message: "Xóa sinh viên thành công",
      student: students[studentIndex],
   });
});

//--------------------------------------------------CONFIG--------------------------------------------------//

APP.use("/api/products", productRoutes);

// Connect to MongoDB
MONGOOSE.connect(process.env.MONGODB_URL).catch((error) => {
   console.error("MongoDB connection error:", error);
   process.exit(1);
});
MONGOOSE.connection.on("connected", () => console.log("Connected to MongoDB"));

// Start Server
APP.listen(process.env.PORT, process.env.HOST, () => {
   console.log(
      `🚀 Server is running on http://${process.env.HOST}:${process.env.PORT} 🚀`
   );
});

import bcrypt from "bcrypt";

// Middleware để mã hóa mật khẩu
export const hashPassword = async (schema) => {
   schema.pre("save", async function (next) {
      try {
         if (!this.isModified("Password")) {
            return next();
         }
         const salt = await bcrypt.genSalt(10);
         this.Password = await bcrypt.hash(this.Password, salt);
         next();
      } catch (error) {
         next(error);
      }
   });
};

// Phương thức để so sánh mật khẩu
export const comparePasswordMethod = (schema) => {
   schema.methods.comparePassword = async function (candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.Password);
   };
};

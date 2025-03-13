// utils/responseHandler.js
const handleResponse = (res, result) => {
   // Kiểm tra result có tồn tại không (đề phòng lỗi bất ngờ)
   if (!result) {
     return res.status(500).json({ message: "Internal server error" });
   }
 
   if (result.success) {
     // Nếu thành công, dùng status từ result hoặc mặc định là 200
     const status = result.status || 200;
     res.status(status).json(result.data || { message: result.message });
   } else {
     // Nếu thất bại, dùng status từ result hoặc mặc định là 500
     const status = result.status || 500;
     res.status(status).json({
       message: result.message,
       error: result.error || undefined, // Không trả error nếu không có
     });
   }
 };
 
 export default handleResponse;
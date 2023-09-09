const TutorialDisplay = () => {
  return (
    <div className="flex flex-col justify-center gap-10 py-10">
      <p className="text-lg">
        Bước 1: Đăng nhập portal, chọn mục "TRA CỨU KẾT QUẢ HỌC TẬP".
      </p>
      <p className="text-lg">
        Bước 2: Chọn "TẤT CẢ" năm học, bôi đen & copy giá trị các cột từ "NH/NK"
        đến "GHI CHÚ" (ảnh bên dưới chỉ minh họa cho 1 HỌC KỲ).
      </p>
      <div className="w-[60%] min-w-[380px] mx-auto">
        <img className="w-[100%]" src="tut1.png" alt="tut1" />
      </div>
      <p className="text-lg">
        Bước 3: Tạo file excel mới & paste giá trị tại ô (A,1).
      </p>
      <p className="text-lg">
        Bước 4: Lưu file và sử dụng ở mục "Trang chủ" của phần mềm.
      </p>
      <div className="w-[60%] min-w-[380px] mx-auto">
        <img className="w-[100%]" src="tut2.png" alt="tut2" />
      </div>
    </div>
  );
};

export default TutorialDisplay;

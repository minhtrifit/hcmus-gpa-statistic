import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  Table,
  Button,
  Popconfirm,
  Upload,
  Checkbox,
  Input,
  Modal,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";
import { toast } from "react-toastify";

const { Search } = Input;

const GpaDisplay = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const dispatch = useDispatch();

  const gpaData: any = useSelector<RootState, any[] | undefined>(
    (state) => state.gpa.data
  );

  const gpaResult: number | undefined = useSelector<
    RootState,
    number | undefined
  >((state) => state.gpa.gpaResult);

  const gpaSum: number | undefined = useSelector<RootState, number | undefined>(
    (state) => state.gpa.gpaSum
  );

  const [cols, setCols] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: "NK/HK",
      dataIndex: "semester",
      editable: true,
    },
    {
      title: "Môn học",
      dataIndex: "subject",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "credits",
      sorter: (a: any, b: any) => a.credits - b.credits,
    },
    {
      title: "Lớp",
      dataIndex: "class",
    },
    {
      title: "Mã LĐ",
      dataIndex: "ldCode",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      sorter: (a: any, b: any) => a.point - b.point,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => {
            handleDelete(record);
          }}
        >
          <DeleteOutlined className="text-red-500 text-[20px]" />
        </Popconfirm>
      ),
    },
  ]);

  const handleDelete = (key: any) => {
    dispatch({ type: "deleteRecord", payload: key });
  };

  const checkFile = (file: any) => {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);

    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }

    console.log("errorMessage", errorMessage);
    return errorMessage;
  };

  const fileHandler = (fileList: any) => {
    let fileObj = fileList;

    if (!fileObj) {
      toast.error("Không có file excel được tải");
      return false;
    }

    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      toast.error("File không đúng định dạng excel");
    } else {
      ExcelRenderer(fileObj, (err: any, resp: any) => {
        if (err) {
          console.log(err);
        } else {
          let newRows: any[] = [];
          resp.rows.slice(0).map((row: any, index: any) => {
            if (row && row !== "undefined" && row.length !== 0) {
              newRows.push({
                key: index,
                semester: row[0],
                subject: row[1],
                credits: row[2],
                class: row[3],
                ldCode: row[4],
                point: row[5],
                note: row[6],
              });
            }
          });
          if (newRows.length === 0) {
            return false;
          } else {
            setCols(resp.cols);

            dispatch({ type: "importData", payload: newRows });
          }
        }
      });
      toast.success("Tải file excel thành công");
    }

    return false;
  };

  const handleSubmit = async () => {
    console.log("submitting: ", gpaData);
    // submit to API
    // if successful, banigate and clear the data
    // setRows([])
  };

  const handleGpaStatistic = async () => {
    let pointGpa = 0;
    let sumGpa = 0;
    let result = 0;

    if (gpaData !== undefined) {
      for (var i = 0; i < gpaData?.length; ++i) {
        if (gpaData[i]?.point && gpaData[i]?.point !== "Vắng") {
          console.log(gpaData[i]);
          pointGpa += gpaData[i]?.credits * gpaData[i]?.point;
          sumGpa += gpaData[i]?.credits;
        }
      }
      if (pointGpa !== undefined && sumGpa !== undefined) {
        result = pointGpa / sumGpa;
      }

      dispatch({
        type: "setGpaResult",
        payload: { sum: sumGpa, result: Number(result.toFixed(3)) },
      });
    }
  };

  const filterDublicate = (e: CheckboxChangeEvent) => {
    dispatch({
      type: "filterDublicate",
      payload: { list: gpaData, checked: e.target.checked },
    });
  };

  const filterEnglishSubject = (e: CheckboxChangeEvent) => {
    dispatch({
      type: "filterEnglishSubject",
      payload: { list: gpaData, checked: e.target.checked },
    });
  };

  const filterPESubject = (e: CheckboxChangeEvent) => {
    dispatch({
      type: "filterPESubject",
      payload: { list: gpaData, checked: e.target.checked },
    });
  };

  const filterdefenseAndSecurityEducationSubject = (e: CheckboxChangeEvent) => {
    dispatch({
      type: "filterdefenseAndSecurityEducationSubject",
      payload: { list: gpaData, checked: e.target.checked },
    });
  };

  const onSearch: any["onSearch"] = (value: any, _e: any, info: any) => {
    dispatch({
      type: "searchSubject",
      payload: { value: value?.target?.value },
    });
  };

  return (
    <>
      <Modal
        title="Kết quả của bạn:"
        style={{ top: 20, minHeight: 100 }}
        width={800}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setModal1Open(false);
            }}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>GPA: {gpaResult}</p>
        <p>Số tín chỉ: {gpaSum}</p>
      </Modal>
      <div className="px-10 mt-10 flex justify-center">
        <p>PHẦN MỀM TÍNH GPA - HCMUS</p>
      </div>
      <div className="px-10">
        <div className="my-10">
          {gpaData !== undefined && gpaData?.length > 0 && (
            <div className="w-[400px] flex gap-4">
              <Button
                onClick={() => {
                  handleGpaStatistic();
                  setModal1Open(true);
                }}
                size="large"
                type="primary"
                danger
              >
                Tính toán GPA
              </Button>
              <Button onClick={handleSubmit} size="large" type="primary">
                Xuất kết quả
              </Button>
            </div>
          )}
        </div>
        <div className="w-[400px]">
          <Upload
            name="file"
            beforeUpload={fileHandler}
            onRemove={() => {
              dispatch({ type: "deleteData" });
            }}
            multiple={false}
          >
            <Button>
              Tải File Excel Bảng Điểm
              <UploadOutlined />
            </Button>
          </Upload>
        </div>
        <div className="mx-auto my-10">
          {gpaData !== undefined && gpaData?.length > 0 && (
            <div className="flex flex-col gap-4 w-[400px]">
              <p className="text-blue-500 font-bold">Bộ lọc học phần:</p>
              <Checkbox onChange={filterDublicate}>
                Lọc các môn học lại/ cải thiện
              </Checkbox>
              <Checkbox onChange={filterEnglishSubject}>
                Lọc các học phần Anh Văn
              </Checkbox>
              <Checkbox onChange={filterPESubject}>
                Lọc các học phần Thể Dục
              </Checkbox>
              <Checkbox onChange={filterdefenseAndSecurityEducationSubject}>
                Lọc các học phần Giáo Dục Quốc Phòng
              </Checkbox>
            </div>
          )}
          <Search
            className="w-[400px] my-10"
            placeholder="Tìm kiếm môn học"
            allowClear
            onChange={onSearch}
          />
          <Table dataSource={gpaData} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default GpaDisplay;

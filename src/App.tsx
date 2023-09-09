import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout, Tabs } from "antd";
import type { TabsProps } from "antd";

import GpaDisplay from "./components/GpaDisplay";
import TutorialDisplay from "./components/TutorialDisplay";

const { Footer } = Layout;

const onChange = (key: string) => {
  // console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Trang chủ",
    children: <GpaDisplay />,
  },
  {
    key: "2",
    label: "Hướng dẫn",
    children: <TutorialDisplay />,
  },
];

const App = () => {
  return (
    <>
      <div className="px-10 mt-10 flex justify-center">
        <p className="text-2xl font-bold text-blue-700">
          PHẦN MỀM TÍNH GPA - HCMUS
        </p>
      </div>
      <ToastContainer position="bottom-left" theme="colored" />
      <Tabs
        className="px-10 min-h-[850px]"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      <Footer style={{ textAlign: "center" }}>
        Copyright© Bản quyền thuộc về minhtrifit
      </Footer>
    </>
  );
};

export default App;

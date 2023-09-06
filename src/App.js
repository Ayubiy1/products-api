import { SlBasketLoaded } from "react-icons/sl";
import { useLocalStorageState } from "ahooks";
import {
  DeleteOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Table,
  message,
  Space,
  Dropdown,
  Select,
  Form,
} from "antd";

const api = "https://dummyjson.com/products";
const getApi = "https://dummyjson.com/products/1";
const searchApi = "https://dummyjson.com/products/search?q=phone";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Sotuv amlaga oshirildi",
    });
  };

  const [products, setProducts] = useLocalStorageState("products", {
    defaultValue: [],
  });
  const [pagination, setPagination] = useState(10);
  const [paginationNext, setPaginationNext] = useState(0);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenK, setIsModalOpenK] = useState(false);
  const [isModalOpenI, setIsModalOpenI] = useState(false);
  const [buy, setBuy] = useState([]);
  const [info, setInfo] = useState(null);
  const [filterC, setFilter] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalK = () => {
    setIsModalOpenK(true);
  };
  const handleOkK = () => {
    setIsModalOpenK(false);
  };
  const handleCancelK = () => {
    setIsModalOpenK(false);
  };

  const showModalI = () => {
    setIsModalOpenI(true);
  };
  const handleOkI = () => {
    setIsModalOpenI(false);
  };
  const handleCancelI = () => {
    setIsModalOpenI(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(api);
        setProducts(res?.data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filterData = products.filter((c) =>
    filterC !== ""
      ? c.category.toLocaleLowerCase().includes(filterC.toLocaleLowerCase())
      : c.category
  );

  const searchData = filterData.filter((c) =>
    search !== ""
      ? c.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      : c.title
  );

  // console.log(products);

  const b = searchData.map((i) => i.brand);

  const columnsSponsors = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (value, row) => value,
    },
    {
      title: "Product name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "actions",
      dataIndex: "actions",
      key: "actions",
      render: (value, row) => (
        <>
          <Button
            type="dashed"
            onClick={() => {
              showModalI();
              handleCancel();
              setInfo(row);
            }}
          >
            <InfoCircleOutlined />
          </Button>
        </>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center justify-between">
          <Button className="w-[100%]" onClick={showModal}>
            <p className="m-0">Korzinka</p>
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center justify-between">
          <Button className="w-[100%]" onClick={showModalK}>
            <p className="m-0">Filter</p>
          </Button>
        </div>
      ),
    },
  ];

  const category = [
    {
      name: "",
    },
    {
      name: "smartphones",
    },
    {
      name: "laptops",
    },
    {
      name: "fragrances",
    },
    {
      name: "skincare",
    },
    {
      name: "groceries",
    },
    {
      name: "home-decoration",
    },
  ];

  const brandValue = (value) => {
    if (value !== undefined) {
      setFilter(value.category);
      handleCancelK();
    }
    console.log(filterC);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Korzinka"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          dataSource={buy}
          columns={columnsSponsors}
          pagination={{
            pageSize: 3,
          }}
        />
      </Modal>

      <Modal
        title="Filter"
        open={isModalOpenK}
        onOk={handleOkK}
        onCancel={handleCancelK}
        footer={false}
      >
        <Form onFinish={brandValue}>
          {/* <Form.Item name={"brand"} label={"Mahsulotni brand bilan filterlash"}>
            <Select
              defaultValue="Brand name"
              style={{
                width: 120,
              }}
              allowClear
            >
              {searchData.map((i) => {
                return <option value={i.brand}>{i.brand}</option>;
              })}
            </Select>
          </Form.Item> */}

          <Form.Item
            name={"category"}
            label={"Mahsulotni kategoriya bilan filterlash"}
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Categoriyani tanlang" }]}
          >
            <Select
              defaultValue="Categories name"
              style={{
                width: 120,
              }}
              allowClear
            >
              {category.map((i) => {
                return <option value={i.name}>{i.name}</option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            className="text-right"
            rules={[{ required: true, message: "OTM ni tanlang" }]}
          >
            <Button type="primary" htmlType="submit">
              Filter qilish
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Info"
        open={isModalOpenI}
        onOk={handleOkI}
        onCancel={handleCancelI}
        footer={false}
      >
        <div className="col-4 mt-4 rounded-3">
          <div className="card" style={{ width: "100%", height: "100%" }}>
            <div style={{ height: "300px" }}>
              <img
                src={info?.images[0]}
                className="w-[100%] rounded-lg h-100 "
                alt="..."
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{info?.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item ">Name: {info?.brand}</li>
              <li className="list-group-item">Category: {info?.category}</li>
              <li className="list-group-item">Price: {info?.price}$</li>
            </ul>
          </div>
        </div>
      </Modal>

      <div className="flex itemscenter my-12 justify-center h-[100vh]">
        <div
          className="border-2 w-[400px] h[555px] p-3 rounded-lg shadow-gray-500"
          style={{ minHeight: "555px" }}
        >
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search porduct"
              type="text"
              className="placeholder:text-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                >
                  <Button>
                    <MenuFoldOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Space>
          </div>
          {searchData.slice(paginationNext, pagination)?.map((item, index) => {
            return (
              <div
                className="text-start my-2 py-2 px-2 flex items-center justify-between rounded-md"
                style={{
                  boxShadow: "0px 0px 7px 0px rgba(89, 111, 127, 0.27)",
                }}
                key={item.id}
              >
                <p className="m-0">{item?.title}</p>

                <Button
                  type="primary"
                  size="default"
                  onClick={() => {
                    success();
                    setBuy((prev) => [...prev, { ...item, index: index }]);
                  }}
                >
                  Buy
                </Button>
              </div>
            );
          })}

          <div className="flex items-center justify-between mt-[10px]">
            <Button
              onClick={() => {
                if (paginationNext !== 0) {
                  setPaginationNext((prev) => prev - 10);
                  setPagination((prev) => prev - 10);
                }
                if (paginationNext == 10) {
                  setActive(0);
                }
                if (paginationNext == 20) {
                  setActive(1);
                }
              }}
            >
              <LeftOutlined />
            </Button>

            {searchData.length >= 10 && (
              <Button
                className={`${
                  active === 0 ? "bg-blue-600 text-white hover:text-white" : ""
                }`}
                onClick={() => {
                  setPaginationNext(0);
                  setPagination(10);
                  setActive(0);
                }}
              >
                10
              </Button>
            )}
            {searchData.length >= 20 && (
              <Button
                className={`${
                  active === 1 ? "bg-blue-600 text-white hover:text-white" : ""
                }`}
                onClick={() => {
                  setPaginationNext(10);
                  setPagination(20);
                  setActive(1);
                }}
              >
                20
              </Button>
            )}

            {searchData.length >= 30 && (
              <Button
                className={`${
                  active === 2 ? "bg-blue-600 text-white hover:text-white" : ""
                }`}
                onClick={() => {
                  setPaginationNext(20);
                  setPagination(30);
                  setActive(2);
                }}
              >
                30
              </Button>
            )}

            <Button
              onClick={() => {
                if (pagination != products.length) {
                  setPaginationNext((prev) => prev + 10);
                  setPagination((prev) => prev + 10);
                }
                if (pagination >= 10) {
                  setActive(1);
                }
                if (pagination >= 20) {
                  setActive(2);
                }
              }}
            >
              <RightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

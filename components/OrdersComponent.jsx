import styles from "../styles/OrdersComponent.module.css";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { updateOrder, deleteOrder } from "../client/requests";

const OrdersComponent = ({ orders }) => {
  const [ordersData, setOrdersData] = useState(orders);
  const [ordersDataFilter, setOrdersDataFilter] = useState(ordersData);
  const [newUpdatedOrder, setNewUpdatedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [recordsPerPage] = useState(10);
  const [transactionState, setTransactionState] = useState(0);
  const statusDetail = ["paid", "processing", "delivered"];

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = ordersDataFilter?.slice(
    indexOfFirstRecord,
    indexedOfLastRecord
  );

  // calculating the number of pages
  const nPages = Math.ceil(ordersDataFilter?.length / recordsPerPage);

  const getStyle = (status) => {
    if (status === 0) return styles["order__paid"];
    if (status === 1) return styles["order__processing"];
    if (status === 2) return styles["order__delivered"];
  };

  useEffect(() => {
    setOrdersDataFilter(
      ordersData.filter((order) => +transactionState === order?.status)
    );
    setCurrentPage(1);
  }, [transactionState]);

  useEffect(() => {
    if (newUpdatedOrder !== null) {
      setOrdersDataFilter(
        ordersData.filter((order) => +transactionState === order?.status)
      );
    }
  }, [newUpdatedOrder]);

  useEffect(() => {
    setOrdersDataFilter(
      ordersData.filter((order) => +transactionState === order?.status)
    );
  }, [ordersData]);

  const handleNext = async (id, status) => {
    setError(false);
    if (status === 2) {
      return;
    } else {
      const newStatus = { status: status + 1 };
      const res = await updateOrder(id, newStatus);
      if (res.status === 201) {
        setOrdersData([
          ...ordersData.filter((order) => order._id !== id),
          res.data,
        ]);
        setNewUpdatedOrder(res.data);
      }

      if (res.status === 500) {
        setError(true);
      }
    }
  };

  const handleDelete = async (id) => {
    setError(false);
    const res = await deleteOrder(id);
    if (res.status === 200) {
      setOrdersData([...ordersData.filter((order) => order._id !== id)]);
    }

    if (res.status === 500) {
      setError(true);
    }
  };

  return (
    <div className={styles.orders__component}>
      <div className={styles.orders__component__wrapper}>
        {error && <p className="error">Something went wrong!</p>}
        <div className={styles.orders__component__filter}>
          <select
            onChange={(e) => setTransactionState(e.target.value)}
            className={styles.orders__component__select}
          >
            <option value={0}>paid</option>
            <option value={1}>pending</option>
            <option value={2}>Delivered</option>
          </select>
        </div>

        <div className={styles.orders__component__table__wrapper}>
          <table className={styles.orders__component__table}>
            <thead>
              <tr className={styles.orders__component__table__row__body}>
                <th className={styles.orders__component__table__columns__head}>
                  order id
                </th>
                <th className={styles.orders__component__table__columns__head}>
                  customer
                </th>
                <th className={styles.orders__component__table__columns__head}>
                  total
                </th>
                <th className={styles.orders__component__table__columns__head}>
                  status
                </th>
                <th className={styles.orders__component__table__columns__head}>
                  actions
                </th>
              </tr>
            </thead>
            <tbody className={styles.orders__component__table__body}>
              {currentRecords.map((order, idx) => (
                <tr
                  key={idx}
                  className={styles.orders__component__table__row__body}
                >
                  <td
                    className={styles.orders__component__table__columns__body}
                    data-label="order-id"
                  >
                    {order?.orderId}
                  </td>
                  <td
                    className={styles.orders__component__table__columns__body}
                    data-label="email"
                  >
                    {order?.customer}
                  </td>
                  <td
                    className={styles.orders__component__table__columns__body}
                    data-label="total"
                  >
                    $ {order?.total}
                  </td>
                  <td
                    className={`${
                      styles["orders__component__table__columns__body"]
                    } + ${getStyle(order?.status)}`}
                    data-label="status"
                  >
                    {statusDetail[order?.status]}
                  </td>
                  <td
                    className={styles.orders__component__table__columns__body}
                    data-label="next"
                  >
                    {order?.status < 2 ? (
                      <button
                        onClick={() => handleNext(order?._id, order?.status)}
                        className={styles.orders__component__table__button}
                      >
                        Next Stage
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(order?._id)}
                        className={
                          styles.orders__component__table__button__delete
                        }
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination__wrapper}>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;

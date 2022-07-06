import React from "react";
import PropTypes from "prop-types";
import { BsCircleFill } from 'react-icons/bs';
import { toast } from "react-toastify";
import axios from 'axios';

// components

export default function ProductsTablee({ color, orders }) {
  function orderState(value, order) {
    if (value == "isDelivered") {
      order.isDelivered = true;
      return toast.success("Sipariş teslim edildi olarak güncellendi")
    }
    if (value == "gettingReady") {
      order.isDelivered = false;
      axios.post('/api/products/update').then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
      return toast.success("Sipariş hazırlanıyor olarak güncellendi")
    }
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-gray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-700" : "text-white")
                }
              >
                Siparişler
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Sipariş
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Fiyat
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Durum
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >Müşteri</th>
              </tr>
            </thead>
            {orders.length == 0 ? (
              <div>Heniz sipariş yok</div>
            ) : (
              orders.map(order => (
                <tbody>
                  <tr>
                    <th className=" mt-1 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      # {order.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {order.totalPrice} ₺
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      <div className="flex items-center ">
                        <BsCircleFill className={`fas fa-circle mr-2 ${order.isDelivered ? "text-indigo-500" : "text-indigo-200"}`} />
                        <div class="relative">
                          <select onChange={(e) => orderState(e.target.value, order)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value="gettingReady">Hazırlanıyor</option>
                            <option value="isDelivered" selected={order.isDelivered}>Teslim edildi</option>
                          </select>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      {order.user.name}
                    </td>
                  </tr>

                </tbody>
              ))
            )}

          </table>
        </div>
      </div>
    </>
  );
}

ProductsTablee.defaultProps = {
  color: "light",
};

ProductsTablee.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";

const Status = ({ active }) => {
  return (
    <div>
      {active ? (
        <FaCheckCircle style={{ color: "#198754", fontSize: "1.2rem" }} />
      ) : (
        <BsFillXCircleFill
          style={{
            color: "#BF202F",
            fontSize: "1.2rem",
          }}
        />
      )}
    </div>
  );
};

export default Status;

export const purchaseOrderStatus = (status) => {
  return (
    <>
      {status === "PENDING" ? (
        <button
          style={{
            color: "#E84D43",
            background: "#FFF2EA",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; PENDING
        </button>
      ) : status === "IN_PROGRESS" ? (
        <button
          style={{
            color: "#008FFB",
            background: "#C9E8FF",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "88px",
          }}
        >
          &#x2022; IN PROGRESS
        </button>
      ) :status === "RESOLVED" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; RESOLVED
        </button>
      ): (
        <button
          style={{
            color: "#EC3652",
            background: "#EC36522A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; CANCELLED
        </button>
      )}
    </>
  );
};
export const dyeingStatus = (status) => {
  return (
    <>
      {status === "PENDING" ? (
        <button
          style={{
            color: "#E84D43",
            background: "#FFF2EA",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; PENDING
        </button>
      ) : status === "COMPLETED" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; COMPLETED
        </button>
      ) : status === "PARTIALLY_COMPLETED" ? (
        <button
          style={{
            color: "#E4A11B",
            background: "#E4A11B2A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; PARTIAL
        </button>
      ) : (
        <button
          style={{
            color: "#EC3652",
            background: "#EC36522A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; TERMINATED
        </button>
      )}
    </>
  );
};
export const weavingStatus = (status) => {
  return (
    <>
      {status === "PENDING" ? (
        <button
          style={{
            color: "#E84D43",
            background: "#FFF2EA",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; PENDING
        </button>
      ) : status === "RECEIVED" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; RECEIVED
        </button>
      ) : (
        <button
          style={{
            color: "#EC3652",
            background: "#EC36522A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; CANCELLED
        </button>
      )}
    </>
  );
};
export const customerOrderStatus = (status) => {
  return (
    <>
      {status === "PENDING" ? (
        <button
          style={{
            color: "#E84D43",
            background: "#FFF2EA",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; PENDING
        </button>
      ) : status === "WEAVING" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; WEAVING
        </button>
      ) : status === "WEAVING_READY" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "120px",
          }}
        >
          &#x2022; WEAVING READY
        </button>
      ) : status === "DYEING" ? (
        <button
          style={{
            color: "#2A66FF",
            background: "#2A66FF2A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; DYEING
        </button>
      ) : status === "DYEING_COMPLETED" ? (
        <button
          style={{
            color: "#2ae0ff",
            background: "#84edff2a",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "120px",
          }}
        >
          &#x2022; DYE COMPLETED
        </button>
      ) : status === "COMPLETED" ? (
        <button
          style={{
            color: "#0a663b",
            background: "#34c58066",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "120px",
          }}
        >
          &#x2022; COMPLETED
        </button>
      ) : (
        <button
          style={{
            color: "#EC3652",
            background: "#EC36522A",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; CANCELLED
        </button>
      )}
    </>
  );
};
export const stockAnalysisStatus = (status) => {
  return (
    <>
      {status === "In Stock" ? (
        <button
          style={{
            color: "#11B066",
            background: "#E3F3E9",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; {status}
        </button>
      ) : status === "Out Of Stock" ? (
        <button
          style={{
            color: "#EC3652",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; {status}
        </button>
      ) : status === "Low Stock" ? (
        <button
          style={{
            color: "#f0ad4e",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; {status}
        </button>
      ) : (
        <button
          style={{
            color: "#d9534f",
            borderRadius: "15px",
            border: "0px",
            fontSize: "0.7rem",
            padding: "4px",
            width: "82px",
          }}
        >
          &#x2022; {status}
        </button>
      )}
    </>
  );
};

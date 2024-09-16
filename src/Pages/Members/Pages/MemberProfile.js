import React from "react";
import { TiEye } from "react-icons/ti";
import { useSelector } from "react-redux";
import ColumnResize from "react-table-column-resizer";
import { clearEditUserGroup } from "../../UserGroup/Redux/userGroupSlice";

const MemberProfile = ({ setPostsPerPage }) => {
  const { next, member } = useSelector((state) => state.members);

  const scrollToEnd = () => {
    setPostsPerPage((prev) => prev + 10);
  };

  const handleScroll = (event) => {
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight >= event.currentTarget.scrollHeight - 1) {
      if (next) {
        scrollToEnd();
      }
    }
  };
  return (
    <>
      {member && (
        <div className="employee-details-container">
          <div className="row w-100 justify-content-between  align-items-start">
            <div className=" mr-4 p-0 ">
              <div className="profile">
                <img
                  src={member.user.image || "https://atlantabuilding.com.au/wp-content/uploads/2017/03/dummy-face.jpg"}
                  alt="profile"
                />
                <h2 className="text-capitalize">{member?.user.username}</h2>
              </div>
            </div>
            <div className="col-4 official-details ">
              <div className="center-border"></div>
              <div>
                <p>
                  Contact:
                  <strong>{member?.user?.phone ? member?.user.phone : "N/A"}</strong>{" "}
                </p>
                <p>
                  Email: <strong>{member.user.email ? member?.user.email : "N/A"}</strong>{" "}
                </p>
                <p>
                  Address: <strong>{member?.address ? member?.address : "N/A"}</strong>{" "}
                </p>
                <p>
                  Gender: <strong>{member?.gender ? member?.gender : "N/A"}</strong>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="employee-details-container" style={{ marginTop: "20px" }}>
        <h5>Documents</h5>
        <table className="listing-table">
          <thead>
            <tr>
              <th>SN</th>
              <ColumnResize id={1} className="columnResizer" />
              <th>Name</th>
              <ColumnResize id={2} className="columnResizer" minWidth={120} />
              <th>Uploaded Date.</th>
              <ColumnResize id={3} className="columnResizer" minWidth={120} />
              <th>View</th>
              <ColumnResize id={3} className="columnResizer" minWidth={120} />
            </tr>
          </thead>
          <tbody>
            {member &&
              member?.documents?.map((doc, i) => {
                const { id, documentName, document, createdAt } = doc;
                return (
                  <tr key={id} style={{ cursor: "pointer" }}>
                    <td>{i + 1}</td>
                    <td className="column_resizer_body" />
                    <td>{documentName ? documentName : "N/A"}</td>
                    <td className="column_resizer_body" />
                    <td>{createdAt ? createdAt.substring(0, 10) : "N/A"}</td>
                    <td className="column_resizer_body" />

                    <td>
                      <a href={document} download target="_blank" rel="noreferrer">
                        <TiEye size={20} color="#bf202f" />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MemberProfile;

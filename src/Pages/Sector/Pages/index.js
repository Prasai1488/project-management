import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { getSectors, handleSearch } from "../Redux/thunk";
import { clearAllSectors } from "../Redux/sectorSlice";
import CreateSector from "./CreateSectors";
import "./sectors.css";
import SectorsListing from "./SectorsListing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "Sectors";
const types = "Sectors";

const Sectors = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loadingSectors = useSelector((state) => state.sectors.loadingSectors);

  const sectors = useSelector((state) => state.sectors.sectors);
  const count = useSelector((state) => state.sectors.count);
  const edit = useSelector((state) => state.sectors.edit);
  const [showSectorsModal, setShowSectorsModal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getSectors(postsPerPage));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loadingSectors}
          data={sectors}
          count={count}
        />

        {loadingSectors && <ListingSkeleton />}
        {!loadingSectors && <SectorsListing dispatch={dispatch} setSectorsModal={setShowSectorsModal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={showSectorsModal}
        setShowModal={setShowSectorsModal}
        createPermission={createPermission}
      />
      {showSectorsModal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={showSectorsModal}
            setShowModal={setShowSectorsModal}
            header={edit ? "Update Sector" : "Add Sector"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAllSectors}
          >
            <CreateSector dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShowSectorsModal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default Sectors;

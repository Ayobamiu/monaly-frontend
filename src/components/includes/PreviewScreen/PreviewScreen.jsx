import React from "react";
import { useDispatch } from "react-redux";
import {
  removecustomLink,
  updateCustomLink,
} from "../../../store/customLinkSlice";
import AddLinkBox from "../AddLinkBox/AddLink";

const PreviewScreen = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {data && data.length > 0 ? (
        data.map((customLink, index) => (
          <AddLinkBox
            title={customLink.title}
            _id={customLink._id}
            link={customLink.link}
            visible={customLink.visible}
            onClickDelete={() => dispatch(removecustomLink(customLink._id))}
            onChangeTitle={(text) =>
              dispatch(updateCustomLink(customLink._id, { title: text }))
            }
            onChangeLink={(text) =>
              dispatch(updateCustomLink(customLink._id, { link: text }))
            }
            onChangeSwitch={(text) =>
              dispatch(updateCustomLink(customLink._id, { visible: text }))
            }
            onChangeImage={(data) =>
              dispatch(updateCustomLink(customLink._id, data))
            }
            // key={customLink._id}
            key={index}
          />
        ))
      ) : (
        <div
          style={{
            minHeight: "100px",
            padding: "20px",
            backgroundColor: "white",
            filter: "drop-shadow(0px 8px 16px rgba(17, 17, 17, 0.02))",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p className="custom-p">No links yet</p>
          <p className="custom-p">Add a link to get started</p>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;

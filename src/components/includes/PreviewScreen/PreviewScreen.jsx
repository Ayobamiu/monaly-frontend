import React from "react";
import { useDispatch } from "react-redux";
import { removecustomLink } from "../../../store/customLinkSlice";
import AddLinkBox from "../AddLinkBox/AddLink";

const PreviewScreen = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {data.map((customLink) => (
        <AddLinkBox
          title={customLink.title}
          _id={customLink._id}
          link={customLink.link}
          visible={customLink.visible}
          onClickDelete={() => dispatch(removecustomLink(customLink._id))}
          key={customLink._id}
        />
      ))}
    </div>
  );
};

export default PreviewScreen;
